import GpControlAPI from './GpControlAPI'
import { multilineRegExp } from './utils'

const REGEX = {
  gpControl: /HERO4|HERO5|HERO\+/,
  auth: /HERO2|HERO3/,
  interface: multilineRegExp([/^delay|status|mode|set|shutter|powerOff|powerOn|listMedia/,
    /|deleteAll|deleteLast|deleteFile$/])
}

const APIs = {
  gpControl: GpControlAPI,
}

export default class GoPro {
  constructor(props = {}) {
    this.lastResult = props.lastResult
    this.apiProps = {
      ip: props.ip || '10.5.5.9',
      mac: props.mac,
      model: props.model
    }
    this._promise = this._discover().then(api => {
      if (api === null) return Promise.reject('GoPro not found.')
      else if (api === -1) return Promise.reject('Unsupported GoPro.')
      else this.api = new APIs[api](this.apiProps)
    })

    // Delegate functions to API
    const proxy = new Proxy(this, {
      get: (target, property) => {
        const match = property.match(/^catch|then$/)
        if(target[property] !== undefined && !match) return target[property]
        return (...args) => {
          if (match) {
            const newProps = (lastResult) => Object.assign(props, this.apiProps, { lastResult })
            const instance = (lastResult, index) => {
              if (!args[index]) return Promise.reject(lastResult)
              else return args[index](new GoPro(newProps(lastResult)))
            }
            this._promise = this._promise[property](v => instance(v, 0), e => instance(e, 1))
          } else {
            const resolve = lastResult => {
              this.lastResult = lastResult
              if (props.strict && !property.match(REGEX.interface)) {
                return Promise.reject(`${property} not allowed on this interface.`)
              } else if (target.api[property]) return target.api[property].apply(target.api, args)
              else return Promise.reject(`${property} not defined for current API.`)
            }
            this._promise = this._promise.then(resolve)
          }
          return proxy
        }
      }
    })
    return proxy
  }

  _selectAPI(model) {
    return (model && ((model.match(REGEX.gpControl) && 'gpControl') ||
                      (model.match(REGEX.auth) && -1))) || undefined
  }

  _discover() {
    const selection = this._selectAPI(this.apiProps.model)
    if (selection !== undefined) return Promise.resolve(selection)
    let api = new GpControlAPI(this.apiProps)
    return api.request().then(data => {
      const { model_name } = data.info
      this.apiProps.model = model_name
      this.apiProps['gpControlResponse'] = data
      if (!model_name.match(REGEX.gpControl)) return -1
      return 'gpControl'
    }).catch(() => {
      // Handle other types later
      return null
    })
  }

/* === Interface ===
 * delay(milliseconds:integer)
 * set(path:string)
 * status(path:string)
 * mode(mode:string, submode:string)
 * shutter(delay:integer, duration:integer)
 * powerOff()
 * powerOn()
 * listMedia()
 * deleteLast(number:integer)
 * deleteFile(folder:string, file:string)
 * deleteAll()
 */
}
