export class PromiseError extends Error {
  constructor(message = 'PromiseError', status = 400) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else this.stack = (new Error(message)).stack

    return Promise.reject(this)
  }
}

export class NotFoundError extends PromiseError {
  constructor() { super('GoPro not found.', 404) }
}

export class UnsupportedError extends PromiseError {
  constructor() { super('Unsupported GoPro.', 415) }
}

export class ForbiddenMethodError extends PromiseError {
  constructor(property) { super(`${property} not allowed on this interface.`, 403) }
}

export class UndefinedMethodError extends PromiseError {
  constructor(property) { super(`${property} not defined for current API.`, 403) }
}
