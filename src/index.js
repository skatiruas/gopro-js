import GpControlAPI from './GpControlAPI'

const TYPES = {
  gpControl: /HERO4|HERO5|HERO\+/g,
  auth: /HERO2|HERO3/g
}

export default class GoPro {
  constructor({ ip, mac, model } = {}) {
    this.ip = ip || '10.5.5.9'
    this.mac = mac || 'AA:BB:CC:DD:EE:FF'
    this._setAPI(this._selectAPI(model))
  }

  _selectAPI(model) {
    return (model && (
      (model.match(TYPES.gpControl) && new GpControlAPI(this.ip, this.mac)) ||
      (model.match(TYPES.auth) && null))) || undefined
  }

  _discover() {
    let api = new GpControlAPI(this.ip, this.mac)
    return api.request().then(r => {
      const { model_name } = r.data.info
      if (!model_name.match(TYPES.gpControl)) api = null
      this._setAPI(api)
    }).catch(() => {
      // Handle other types later
      this._setAPI(null)
    })
  }

  _setAPI(api) {
    this.api = new Proxy(api || {}, {
      get: (target, property) => {
        if (target[property] !== undefined) return target[property]
        return () => {
          if (api === null) return Promise.reject('GoPro not found.')
          else if (api === undefined) {
            return this._discover().then(() => this.api[property]())
          } else {
            return Promise.reject(`${property} not defined for current API.`)
          }
        }
      }
    })
  }

  status() { return this.api.status() }
}

const x = new GoPro()
x.status().then(r => console.log(r))
