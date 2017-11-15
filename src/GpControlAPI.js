import axios from 'axios'

const str = (str, prefix = '') => str ? `${prefix}${str}` : ''

const CMD = {
  mode: {
    video: [0, 0],
    timelapseVideo: [0, 1],
    videoPhoto: [0, 2],
    looping: [0, 3],
    still: [1, 0],
    continuous: [1, 1],
    night: [1, 2],
    burst: [2, 0],
    timelapse: [2, 1],
    nightlapse: [2, 2]
  }
}

export default class GpControlAPI {
  constructor({ ip, mac } = {}) {
    this.ip = ip || '10.5.5.9'
    this.mac = mac || 'AA:BB:CC:DD:EE:FF'
  }

  request(path, endpoint = 'gpControl', port = '') {
    const url = `http://${this.ip}${str(port, ':')}/gp/${endpoint}${str(path, '/')}`
    return axios.get(url, { timeout: 5000 }).then(r => r.data)
  }

  _command(path) { return this.request(`command${str(path, '/')}`)}

  status() { return this.request('status') }

  mode(arg) {
    const [mode, submode] = CMD['mode'][arg] || [0, 0]
    return this._command(`sub_mode?mode=${mode}&sub_mode=${submode}`)
  }
}
