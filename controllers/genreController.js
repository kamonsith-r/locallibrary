const Genre = require('../models/genre')
const Book = require('../models/book')
const asyncHandler = require('express-async-handler')

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
      .select('title summary'),
  ])
  if (genre === null) {
    const err = new Error('Genre not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: 'Genre Detail', genre, booksInGenre })
})

exports.genreCreateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre create GET')
})

exports.genreCreatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre create POST')
})

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