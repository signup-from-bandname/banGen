const thesaurus = require('powerthesaurus-api')

module.exports = (router) => {
  router.use('/v1/names', (req, res, next) => {
    Promise.all(req.query.bandname.split(' ').map((name) => thesaurus(name)))
    .then((results) => {
      const wordlist = results.map((item) => {
        return item.map((data) => {
          return data.word
        })
      })
      res.json(wordlist)
    })
    .catch(next)
  })
}
