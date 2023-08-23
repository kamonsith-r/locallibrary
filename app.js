require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const { PORT = 8000 } = process.env

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use((req, res, next) => {
  next(createError(404))
})
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).json(res.locals)
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))