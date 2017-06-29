const morgan = require('morgan')
const winston = require('winston')

winston.emitErrs = true

const morganFormatter = (tokens, req, res) => JSON.stringify({
  responseTime: tokens['response-time'](req, res),
  status: tokens.status(req, res),
  method: tokens.method(req, res),
  url: tokens.url(req, res),
  referrer: tokens.referrer(req, res),
})

const indent = (msg, skipFirst) => msg.split('\n').map((l, i) => ((skipFirst && i === 1) ? l : `  ${l}`)).join('\n')

class Logger extends winston.Logger {
  constructor() {
    const logLevel = process.env.LOG_LEVEL || 'debug'
    const logFormat = process.env.LOG_FORMAT || 'json'

    const transports = []
    if (logLevel !== 'silent') {
      transports.push(new winston.transports.Console({
        level: logLevel,
        handleExceptions: true,
        colorize: false,
        formatter: ({ level, message }) => {
          let data

          try {
            data = JSON.parse(message)
          } catch (e) {
            data = { message }
          }

          data.level = level

          if (logFormat !== 'text') {
            return JSON.stringify(data)
          }

          // TODO: replace with yaml output, would be a lot cleaner
          let output = `${level[0].toUpperCase()} `

          if (data.message) {
            output += `${indent(data.message, true)}`
          }

          Object.keys(data)
            .filter(key => !['message', 'level'].includes(key))
            .forEach((key, i) => {
              output += i === 0 ? `  ${key}:` : `\n    ${key}:`
              if (typeof data[key] === 'object') {
                output += indent(JSON.stringify(data[key], null, 2), true)
                return
              }

              output += ` ${data[key]}`
            })

          return output
        },
        timestamp: true,
      }))
    }

    super({ transports, exitOnError: false })
  }

  get middleware() {
    return (req, res, next) => {
      const wrapMessage = (args) => {
        const log = { requestId: req.requestId }
        if (typeof args === 'string') {
          log.message = args
        } else if (args instanceof Error) {
          log.message = args.message
          log.stack = args.stack
          log.name = args.name
        } else {
          log.data = args
        }

        return JSON.stringify(log)
      }

      res.logger = {  // eslint-disable-line no-param-reassign
        error: message => this.error(wrapMessage(message)),
        warn: message => this.warn(wrapMessage(message)),
        info: message => this.info(wrapMessage(message)),
        verbose: message => this.verbose(wrapMessage(message)),
        debug: message => this.debug(wrapMessage(message)),
        silly: message => this.silly(wrapMessage(message)),
      }

      morgan(morganFormatter, { stream: { write: msg => this.info(msg) } })(req, res, next)
    }
  }
}

module.exports = new Logger()
