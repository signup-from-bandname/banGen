const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const logger = require('./logger')
const { NotFoundError } = require('./errors')

class Server {
  constructor() {
    this.application = express()
    this.router = express.Router()
    this.port = process.env.PORT || 8008

    this.application.use(logger.middleware)
    this.application.use(bodyParser.json({ limit: '5mb' }))
    this.application.use(this.router)

    this.application.use(express.static('src/static'))

    this.application.use((req, res, next) => {
      next(new NotFoundError())
    })

    this.application.use((err, req, res, next) => {
      res.status(err.statusCode || 500)
      res.json({ error: err.message })
      if (res.logger && typeof res.logger.error === 'function') {
        res.logger.error(err.stack)
      }
      next()
    })

    this.registerRoutes(path.join(__dirname, 'routes'))
  }

  registerRoutes(dirname) {
    fs.readdirSync(dirname)
      .filter(filename => path.extname(filename) === '.js')
      .forEach((filename) => {
        try {
          // eslint-disable-next-line
          const module = require(path.join(dirname, filename))
          module(this.router)
        } catch (err) {
          logger.debug(err.stack)
        }
      })
  }

  start() {
    return new Promise((resolve) => {
      this.application.listen(this.port, resolve)
    })
  }
}

module.exports = new Server()
