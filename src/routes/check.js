const cybersquatt = require('cybersquatt')
const logger = require('../logger')

module.exports = (router) => {
  router.use('/v1/check', (req, res, next) => {
    const name = req.query.bandname
    if (!name) {
      next(new Error('missing bandname query parameter'))
      return
    }
    logger.debug('check for', name)
    cybersquatt(name).then((result) => {
      res.json(result)
    })
  })
}
