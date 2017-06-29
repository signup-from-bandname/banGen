const packageJson = require('../../package.json')

module.exports = (router) => {
  router.use('/v1/check', (req, res) => {
    res.json({
      available: false,
    })
  })
}
