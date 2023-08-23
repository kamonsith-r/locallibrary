const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('GET home page.')
})

module.exports = router