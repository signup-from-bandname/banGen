const metalName = require('metal-name')

module.exports = (router) => {
  router.use('/v1/name-ideas', (req, res) => {
    res.json({
      names: [...Array(10).keys()].map(metalName),
    })
  })
}
