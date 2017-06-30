const packageJson = require('../../package.json')
const thesaurus = require('powerthesaurus-api');


module.exports = (router) => {
	router.use('/v1/names', (req, res, next) => {
		console.log(req.query.bandname)
		Promise.all(req.query.bandname.split(' ').map((name) => thesaurus(name)))
		.then((results) => {
			var wordlist = results.map(function(item) {
  				return item.map(function(data) {
    				return data.word
  				})
			})
			console.log(wordlist)
			res.json(wordlist)
		})
		.catch(error => console.error(error.stack))
  	})
}