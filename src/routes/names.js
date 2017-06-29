const packageJson = require('../../package.json')

module.exports = (router) => {
  router.use('/v1/names', (req, res) => {
    res.json({
      names: ['abc', '123'],
    })
  })
}
