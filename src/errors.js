class BadRequestError extends Error {
  constructor(msg, id) {
    super(msg || 'Bad Request', id)
    this.name = this.constructor.name
    this.statusCode = 400
  }
}

class UnauthorizedError extends Error {
  constructor(msg, id) {
    super(msg || 'Unauthorized', id)
    this.name = this.constructor.name
    this.statusCode = 401
  }
}

class ForbiddenError extends Error {
  constructor(msg, id) {
    super(msg || 'Forbidden', id)
    this.name = this.constructor.name
    this.statusCode = 403
  }
}

class NotFoundError extends Error {
  constructor(msg, id) {
    super(msg || 'Not Found', id)
    this.name = this.constructor.name
    this.statusCode = 404
  }
}

class MethodNotAllowedError extends Error {
  constructor(msg, id) {
    super(msg || 'Method Not Allowed', id)
    this.name = this.constructor.name
    this.statusCode = 405
  }
}

class InternalServerError extends Error {
  constructor(msg, id) {
    super(msg || 'Internal Server Error', id)
    this.name = this.constructor.name
    this.statusCode = 500
  }
}

class NotImplementedError extends Error {
  constructor(msg, id) {
    super(msg || 'Not Implemented', id)
    this.name = this.constructor.name
    this.statusCode = 501
  }
}

class ServiceUnavailableError extends Error {
  constructor(msg, id) {
    super(msg || 'Service Unavailable', id)
    this.name = this.constructor.name
    this.statusCode = 503
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  MethodNotAllowedError,
  NotFoundError,
  InternalServerError,
  NotImplementedError,
  ServiceUnavailableError,
}
