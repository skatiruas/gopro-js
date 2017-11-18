import axios from 'axios'
import constants from './GpControlValues'
import { prefixedStr, valueFinder } from './utils'

const RETRIES = 10
const RETRY_DELAY = 200

export default class GpControlAPI {
  constructor({ ip, mac } = {}) {
    this.ip = ip || '10.5.5.9'
    this.mac = mac || 'AA:BB:CC:DD:EE:FF'
  }

  request(path = '', { port = '', endpoint = 'gpControl', busyCheck = true, retries = RETRIES } = {}) {
    const url = `http://${this.ip}${prefixedStr(port, ':')}/gp/${endpoint}${prefixedStr(path, '/')}`
    const promise = () => axios.get(url, { timeout: 5000 }).then(r => r.data)
    const retry = () => this.request(path, { endpoint, port, retries: retries - 1, busyCheck })

    if (!busyCheck) return promise()
    else if (retries === 0) return Promise.reject('Camera is Busy.')
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
      else return Promise.reject(`Invalid 'Status.${path}'`)
    })
  }

  mode(mode, submode) {
    const m = valueFinder(constants, `Mode.${mode}`).value
    if (m !== undefined && !submode) return this._command(`mode?p=${m}`)
    const s = valueFinder(constants, `Mode.${mode}.SubMode.${submode}`).value
    if ((m && s) !== undefined) return this._command(`sub_mode?mode=${m}&sub_mode=${s || 0}`)
    return Promise.reject(`Invalid 'Mode.${mode}' or 'Mode.${mode}.SubMode.${submode}'`)
  }

  set(path) {
    const fullPath = `Mode.${path}`
    const { value, setting } = valueFinder(constants, fullPath)
    if((value && setting) !== undefined) return this.request(`setting/${setting}/${value}`)
    else return Promise.reject(`Invalid setting '${fullPath}'`)
  }

  shutter(delay = 0, duration) {
    const click = (on = true) => this._command(`shutter?p=${on ? 1 : 0}`, { busyCheck: false })
    const start = () => delay > 0 ? this.delay(delay).then(click) : click()
    if (!duration) return start()
    else return start().then(() => this.delay(duration)).then(() => click(false))
  }

  powerOff() { return this._command('system/sleep') }

  listMedia() { return this.request('', { endpoint: 'gpMediaList', port: 8080 }) }
}
