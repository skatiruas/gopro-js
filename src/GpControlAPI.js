import axios from 'axios'

const str = (str, prefix = '') => str ? `${prefix}${str}` : ''

export default class GpControlAPI {
  constructor(ip, mac) {
    this.ip = ip || '10.5.5.9'
    this.mac = mac || 'AA:BB:CC:DD:EE:FF'
  }

  request(path, port) {
    const url = `http://${this.ip}${str(port, ':')}/gp/gpControl${str(path, '/')}`
    return axios.get(url, { timeout: 5000 })
  }

  status() { return this.request('status') }
}
