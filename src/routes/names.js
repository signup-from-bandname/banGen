const thesaurus = require('powerthesaurus-api')

const ignore = [
  'a',
  'the',
  'of',
  'in',
  'by',
]

module.exports = (router) => {
  router.use('/v1/names', (req, res, next) => {
    Promise.all(req.query.bandname.split(' ').map((name) => {
      if (ignore.indexOf(name) !== -1) return [{ word: name, upVotes: 1, downVotes: 2 }]
      return thesaurus(name.replace(/'s$/, ''))
    }))
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
