const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

const Genre = require('../models/genre')
const Book = require('../models/book')

exports.genreList = asyncHandler(async (req, res, next) => {
  const genreList = await Genre.find().sort('name')
  return res.json({ title: 'Genre List', genreList })
})

exports.genreDetail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id),
    Book.find().where('genre').equals(req.params.id).select('title summary')
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
  body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const genre = new Genre(req.body)
    if (!errors.isEmpty()) {
      return res.json({ title: 'Create Genre', errors: errors.array(), genre })
    }
    const genreExists = await Genre.findOne().where('name').equals(req.body.name)
    if (genreExists) {
      return res.redirect(genreExists.url)
    }
    await genre.save()
    return res.redirect(genre.url)
  })]

exports.genreDeleteGET = asyncHandler(async (req, res, next) => {
  const [genre, genreBooks] = await Promise.all([
    Genre.findById(req.params.id),
    Book.find().where('genre').equals(req.params.id).select('title summary')
  ])
  if (genre === null) {
    return res.redirect('/catalog/genres')
  }
  return res.json({ title: 'Delete Genre', genre, genreBooks })
})

exports.genreDeletePOST = asyncHandler(async (req, res, next) => {
  const [genre, genreBooks] = await Promise.all([
    Genre.findById(req.params.id),
    Book.find().where('genre').equals(req.params.id).select('title summary')
  ])
  if (genreBooks.length > 0) {
    return res.json({ title: 'Delete Genre', genre, genreBooks })
  }
  await Genre.findByIdAndRemove(req.body.id)
  return res.redirect('/catalog/genres')
})

exports.genreUpdateGET = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id)
  if (genre === null) {
    const err = new Error('Genre not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: 'Update Genre', genre })
})

exports.genreUpdatePOST = [
  body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const genre = new Genre(req.body)
    if (!errors.isEmpty()) {
      return res.json({ title: 'Update Genre', errors: errors.array(), genre })
    }
    await Genre.findByIdAndUpdate(req.params.id, genre)
    return res.redirect(genre.url)
  })]