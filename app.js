const express = require('express')
const createError = require('http-errors')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use((req, res, next) => {
  next(createError(404))
})
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).json(res.locals)
})

app.listen(port, () => console.log(`App listening on port ${port}`))