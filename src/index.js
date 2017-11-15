import GpControlAPI from './GpControlAPI'

const REGEX = {
  gpControl: /HERO4|HERO5|HERO\+/,
  auth: /HERO2|HERO3/,
  interface: /^status|mode|$/
}

export default class GoPro {
  constructor(props = {}) {
    this.apiProps = {
      ip: props.ip || '10.5.5.9',
      mac: props.mac || 'AA:BB:CC:DD:EE:FF',
    }
    this._setAPI(this._selectAPI(props.model))

    // Delegate functions to API
    return new Proxy(this, {
      get: (target, property) => {
        if (target[property] !== undefined) return target[property]
        return (...args) => {
          if (props.strict && !property.match(REGEX.interface)) {
            return Promise.reject(`${property} not allowed on this interface.`)
          } else return target.api[property].apply(target.api, args)
        }
      }
    })
  }

  _selectAPI(model) {
    return (model && (
      (model.match(REGEX.gpControl) && new GpControlAPI(this.apiProps)) ||
      (model.match(REGEX.auth) && null))) || undefined
  }

  _discover() {
    let api = new GpControlAPI(this.apiProps)
    return api.request().then(data => {
      this.apiProps['gpControlResponse'] = data
      const { model_name } = data.info
      if (!model_name.match(REGEX.gpControl)) api = null
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
        return (...args) => {
          if (api === undefined) {
            const retry = () => this.api[property].apply(this.api, args)
            return this._discover().then(retry)
          } else if (api === null) return Promise.reject('GoPro not found.')
          else return Promise.reject(`${property} not defined for current API.`)
        }
      }
    })
  }

/* === Interface ===
 * status()
 * mode(mode, submode)
 */
}

const x = new GoPro()
x.mode(2).then(x.status).then(r => console.log(r))
