import axios from 'axios'
import constants from './GpControlValues'
import { prefixedStr, valueFinder } from './utils'

export default class GpControlAPI {
  constructor({ ip, mac } = {}) {
    this.ip = ip || '10.5.5.9'
    this.mac = mac || 'AA:BB:CC:DD:EE:FF'
  }

  request(path, endpoint = 'gpControl', port = '') {
    port = prefixedStr(port, ':')
    path = prefixedStr(path, '/')
    const url = `http://${this.ip}${port}/gp/${endpoint}${path}`
    return axios.get(url, { timeout: 5000 }).then(r => r.data)
  }

  _command(path) { return this.request(`command${prefixedStr(path, '/')}`)}

  delay(t) { return new Promise(resolve => setTimeout(resolve, t)) }

  status(path) {
    return this.request('status').then(s => {
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

  shutter(start = true, delay = 0) {
    return this.delay(delay).then(() => this._command(`shutter?p=${start ? 1 : 0}`))
  }

  powerOff() { return this._command('system/sleep') }

  listMedia() { return this.request('', 'gpMediaList') }
}
