const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookInstance')

exports.index = asyncHandler(async (req, res, next) => {
  const [bookCount, bookInstanceCount, bookInstanceAvailableCount, authorCount, genreCount]
    = await Promise.all([
      Book.countDocuments(),
      BookInstance.countDocuments(),
      BookInstance.countDocuments({ status: 'Available' }),
      Author.countDocuments(),
      Genre.countDocuments(),
    ])
  return res.json({
    title: 'Local Library Home',
    bookCount, bookInstanceCount, bookInstanceAvailableCount, authorCount, genreCount
  })
})

exports.bookList = asyncHandler(async (req, res, next) => {
  const bookList = await Book.find()
    .select('title')
    .sort('title')
    .populate('author', 'first_name family_name')
  return res.json({ title: 'Book List', bookList })
})

exports.bookDetail = asyncHandler(async (req, res, next) => {
  const { params } = req
  const [book, bookInstances] = await Promise.all([
    Book.findById(params.id)
      .populate('author genre'),
    BookInstance.find()
      .where('book').equals(params.id)
  ])
  if (book === null) {
    const err = new Error('Book not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: book.title, book, bookInstances })
})

exports.bookCreateGET = asyncHandler(async (req, res, next) => {
  const [authors, genres] = await Promise.all([Author.find(), Genre.find()])
  return res.json({ title: 'Create Book', authors, genres })
})

exports.bookCreatePOST = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = new Array(req.body.genre)
    }
    next()
  },
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const book = new Book(req.body)
    if (!errors.isEmpty()) {
      const [authors, genres] = await Promise.all([Author.find(), Genre.find()])
      for (const genre of genres) {
        if (book.genre.includes(genre._id)) genre.checked = 'true'
      }
      return res.json({ title: 'Create Book', authors, genres, book, errors: errors.array() })
    }
    await book.save()
    return res.redirect(book.url)
  })]

exports.bookDeleteGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book delete GET')
})

exports.bookDeletePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book delete POST')
})

exports.bookUpdateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book update GET')
})

exports.bookUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book update POST')
})
