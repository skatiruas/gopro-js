import axios from 'axios'
import mac from 'mac-address'
import constants from './GpControlValues'
import { prefixedStr, valueFinder } from './utils'
import { PromiseError, NotFoundError } from './errors'

const EMPTY = 'empty'
const RETRIES = 10
const RETRY_DELAY = 200
let dgram
try {
  dgram = require('dgram')
} catch(_) {
  dgram = EMPTY // Browser does not support dgram
}

export default class GpControlAPI {
  constructor({ ip, mac } = {}) {
    this.ip = ip || '10.5.5.9'
    this._bufferMac(mac)
  }

  discover() {
    return this.request().then(({ info }) => ({
      model: info.model_name,
      mac: this._bufferMac(info.ap_mac)
    }))
  }

  request(path = '', { port = '', endpoint = 'gpControl', busyCheck = true, retries = RETRIES } = {}) {
    const url = `http://${this.ip}${prefixedStr(port, ':')}/gp/${endpoint}${prefixedStr(path, '/')}`
    const promise = () => axios.get(url, { timeout: 5000 }).catch(() => {
      return new NotFoundError
    }).then(r => r.data)
    const retry = () => this.request(path, { endpoint, port, retries: retries - 1, busyCheck })

    if (!busyCheck) return promise()
    else if (retries === 0) return new PromiseError('Camera is Busy.')
    else return this.status('System.BUSY').then(busy => {
      return busy ? this.delay(RETRY_DELAY).then(retry).then(promise) : promise()
    })
  }

  _command(path, options) { return this.request(`command${prefixedStr(path, '/')}`, options)}

  delay(t) { return new Promise(resolve => setTimeout(resolve, t)) }

  status(path) {
    return this.request('status', { busyCheck: false }).then(s => {
      if(!path) return Promise.resolve(s)
      let { value } = valueFinder(constants, `Status.${path}`)
      value = value && s.status[value]
      if(value !== undefined) return Promise.resolve(value)
      else return new PromiseError(`Invalid 'Status.${path}'`)
    })
  }

  mode(mode, submode) {
    const m = valueFinder(constants, `Mode.${mode}`).value
    if (m !== undefined && !submode) return this._command(`mode?p=${m}`)
    const s = valueFinder(constants, `Mode.${mode}.SubMode.${submode}`).value
    if ((m && s) !== undefined) return this._command(`sub_mode?mode=${m}&sub_mode=${s || 0}`)
    return new PromiseError(`Invalid 'Mode.${mode}' or 'Mode.${mode}.SubMode.${submode}'`)
  }

  set(path) {
    const fullPath = `Mode.${path}`
    const { value, setting } = valueFinder(constants, fullPath)
    if((value && setting) !== undefined) return this.request(`setting/${setting}/${value}`)
    else return new PromiseError(`Invalid setting '${fullPath}'`)
  }

  shutter(delay = 0, duration) {
    const click = (on = true) => this._command(`shutter?p=${on ? 1 : 0}`, { busyCheck: false })
    const start = () => delay > 0 ? this.delay(delay).then(click) : click()
    if (!duration) return start()
    else return start().then(() => this.delay(duration)).then(() => click(false))
  }

  powerOff() { return this._command('system/sleep') }

  listMedia() { return this.request('', { endpoint: 'gpMediaList', port: 8080 }) }

  deleteLast(files = 1) {
    let promise = Promise.resolve()
    for (let i = 0; i < files; i += 1) {
      promise = promise.then(() => this._command('storage/delete/last'))
    }
    return promise
  }

  deleteFile(folder, file) {
    return this._command(`storage/delete?p=${folder}/${file}`)
  }

  deleteAll() { return this._command('storage/delete/all') }

  _bufferMac(macAddress) {
    if (macAddress instanceof Buffer && macAddress.length === mac.LENGTH) this.mac = macAddress
    else if (macAddress instanceof Array) {
      this.mac = macAddress.length === mac.LENGTH && Buffer.from(macAddress)
    } else if (macAddress) {
      this.mac = mac.toBuffer(macAddress.replace(/^(..)(..)(..)(..)(..)(..)$/, '$1:$2:$3:$4:$5:$6'))
    }
    return this.mac
  }

  powerOn() {
    if (dgram === EMPTY) return new PromiseError('powerOn not supported on browser yet.')
    else if (!this.mac) return new PromiseError('Invalid MAC Address.')

    return Promise.resolve().then(() => {
      let [message, size] = [new Buffer(102), this.mac.length]
      for (let i = 0; i < 6; i += 1) message[i] = 0xff
      for (let j = 0; j < 16; j += 1) {
        const c = 6 + j * size
        for (let k = 0; k < size; k += 1) message[c + k] = this.mac[k]
      }

      let socket = dgram.createSocket('udp4')
      const send = (port, callback = () => socket.close()) => {
        return socket.send(message, 0, message.length, port, this.ip, callback)
      }
      send(9, () => send(7))
    })
  }
}
