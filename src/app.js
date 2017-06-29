const server = require('./server')
const logger = require('./logger')

server.start()
  .then(() => logger.info(`Server started on port ${server.port}`))
  .catch(err => logger.error(err.stack))
