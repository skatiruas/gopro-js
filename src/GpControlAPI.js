import axios from 'axios'
import values from './GpControlValues'

const str = (str, prefix = '') => str ? `${prefix}${str}` : ''

export default class GpControlAPI {
  constructor({ ip, mac } = {}) {
    this.ip = ip || '10.5.5.9'
    this.mac = mac || 'AA:BB:CC:DD:EE:FF'
    this.values = values
  }

  _camelize(str) {
    const camel = str.toLowerCase().replace(/\W+(.)/g, (_, chr) => chr.toUpperCase())
    return camel.charAt(0).toUpperCase() + camel.slice(1)
  }

  _valueFinder(...args) {
    let selected = this.values
    for (let i = 0; i < args.length - 1; i += 1) {
      selected = selected[this._camelize(args[i])] || {}
    }
    selected = selected[args[args.length - 1]]
    return typeof(selected) !== 'object' && selected
  }

  request(path, options = { endpoint: 'gpControl', port: '' }) {
    const { port, endpoint } = options
    const url = `http://${this.ip}${str(port, ':')}/gp/${endpoint}${str(path, '/')}`
    return axios.get(url, { timeout: 5000 }).then(r => r.data)
  }

  _command(path) { return this.request(`command${str(path, '/')}`)}

  delay(t) { return new Promise(resolve => setTimeout(resolve, t)) }

  status(type, value) {
    return this.request('status').then(s => {
      if(!type || !value) return Promise.resolve(s)
      const param = this._valueFinder('Status', type, value)
      if (param !== undefined) return Promise.resolve(s.status[param])
      else return Promise.reject('Invalid status.')
    })
  }

  mode(mode, submode) {
    const m = this._valueFinder('Mode', mode)
    if (m !== undefined && !submode) return this._command(`mode?p=${m}`)
    const s = this._valueFinder('Mode', mode, 'SubMode', submode)
    if ((m && s) !== undefined) {
      return this._command(`sub_mode?mode=${m}&sub_mode=${s || 0}`)
    } else return Promise.reject('Invalid mode or submode.')
  }

  shutter(start = true, delay = 0) {
    return this.delay(delay).then(() => this._command(`shutter?p=${start ? 1 : 0}`))
  }
}
