const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('GET users listing.')
})

module.exports = router