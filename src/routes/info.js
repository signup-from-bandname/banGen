const packageJson = require('../../package.json')

module.exports = (router) => {
  router.use('/v1/info', (req, res) => {
    res.json({
      versions: {
        server: packageJson.version,
      },
    })
  })
}
