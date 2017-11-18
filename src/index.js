import GpControlAPI from './GpControlAPI'

const REGEX = {
  gpControl: /HERO4|HERO5|HERO\+/,
  auth: /HERO2|HERO3/,
  interface: /^delay|status|mode$/
}

export default class GoPro {
  constructor(props = {}) {
    this._promise = props.promise || Promise.resolve()
    this.apiProps = {
      ip: props.ip || '10.5.5.9',
      mac: props.mac || 'AA:BB:CC:DD:EE:FF',
    }
    this._setAPI(this._selectAPI(props.model))

    // Delegate functions to API
    return new Proxy(this, {
      get: (target, property) => {
        let [resolve, reference, promise] = [target[property], target, null]
        return (...args) => {
          if (props.strict && !property.match(REGEX.interface)) {
            resolve = () => Promise.reject(`${property} not allowed on this interface.`)
          } else if (!resolve) [resolve, reference] = [target.api[property], target.api]

          if (property.match(/^catch|then$/)) promise = this._promise[property](...args)
          else promise = this._promise.then(() => resolve.apply(reference, args))
          return new GoPro(Object.assign(props, { promise }))
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
      if (!model_name.match(REGEX.gpControl)) api = -1
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
          } else {
            let error = `${property} not defined for current API.`
            if (api === null) error = 'GoPro not found.'
            else if (api === -1) error = 'Unsupported GoPro.'
            return Promise.reject(error)
          }
        }
      }
    })
  }

  delay(t) { return new Promise(resolve => setTimeout(resolve, t)) }

/* === Interface ===
 * status(type:string, value:string)
 * mode(mode:string, submode:string)
 * shutter(start:boolean, delay:integer)
 */
}
