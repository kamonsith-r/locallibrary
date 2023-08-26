const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Genre = require('../models/genre')
const Book = require('../models/book')

exports.genreList = asyncHandler(async (req, res, next) => {
  const genreList = await Genre.find()
    .sort('name')
  return res.json({ title: 'Genre List', genreList })
})

exports.genreDetail = asyncHandler(async (req, res, next) => {
  const { params } = req
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(params.id),
    Book.find()
      .where('genre').equals(params.id)
      .select('title summary')
  ])
  if (genre === null) {
    const err = new Error('Genre not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: 'Genre Detail', genre, booksInGenre })
})

exports.genreCreateGET = asyncHandler(async (req, res, next) => {
  return res.json({ title: 'Create Genre' })
})

exports.genreCreatePOST = [
  body('name', 'Genre name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const genre = new Genre({ name: req.body.name })
    if (!errors.isEmpty()) {
      return res.json({ title: 'Create Genre', genre, errors: errors.array() })
    }
    const genreExists = await Genre.findOne({ name: req.body.name })
    if (genreExists) {
      return res.redirect(genreExists.url)
    }
    await genre.save()
    return res.redirect(genre.url)
  })]

exports.genreDeleteGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete GET')
})

exports.genreDeletePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete POST')
})

exports.genreUpdateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update GET')
})

exports.genreUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update POST')
})