const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookInstance')

exports.index = asyncHandler(async (req, res, next) => {
  const [bookCount, bookInstanceCount, bookInstanceAvailableCount, authorCount, genreCount] = await Promise.all([
    Book.countDocuments(),
    BookInstance.countDocuments(),
    BookInstance.countDocuments()
      .where('status')
      .equals('Available'),
    Author.countDocuments(),
    Genre.countDocuments()
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
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id)
      .populate('author genre'),
    BookInstance.find()
      .where('book')
      .equals(req.params.id)
  ])
  if (book === null) {
    const err = new Error('Book not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: book.title, book, bookInstances })
})

exports.bookCreateGET = asyncHandler(async (req, res, next) => {
  const [authors, genres] = await Promise.all([
    Author.find(),
    Genre.find()
  ])
  return res.json({ title: 'Create Book', authors, genres })
})

exports.bookCreatePOST = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = [req.body.genre]
    }
    next()
  },
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('summary', 'Summary must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('isbn', 'ISBN must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('genre.*')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const book = new Book(req.body)
    if (!errors.isEmpty()) {
      const [authors, genres] = await Promise.all([
        Author.find(),
        Genre.find()
      ])
      for (const genre of genres) {
        if (book.genre.includes(genre._id)) genre.checked = 'true'
      }
      return res.json({ title: 'Create Book', errors: errors.array(), authors, genres, book })
    }
    await book.save()
    return res.redirect(book.url)
  })]

exports.bookDeleteGET = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id)
      .populate('author genre'),
    BookInstance.find()
      .where('book')
      .equals(req.params.id)
  ])
  if (book === null) {
    return res.redirect('/catalog/books')
  }
  return res.json({ title: 'Delete Book', book, bookInstances })
})

exports.bookDeletePOST = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id)
      .populate('author genre'),
    BookInstance.find()
      .where('book')
      .equals(req.params.id)
  ])
  if (book === null) {
    return res.redirect('/catalog/books')
  }
  if (bookInstances.length > 0) {
    return res.render({ title: 'Delete Book', book, bookInstances })
  }
  await Book.findByIdAndRemove(req.body.id)
  return res.redirect('/catalog/books')
})

exports.bookUpdateGET = asyncHandler(async (req, res, next) => {
  const [book, authors, genres] = await Promise.all([
    Book.findById(req.params.id)
      .populate('author')
      .populate('genre'),
    Author.find(),
    Genre.find()
  ])
  if (book === null) {
    const err = new Error('Book not found')
    err.status = 404
    return next(err)
  }
  for (const genre of genres) {
    for (const bookGenre of book.genre) {
      if (genre._id.toString() === bookGenre._id.toString()) genre.checked = 'true'
    }
  }
  return res.json({ title: 'Update Book', authors, genres, book })
})

exports.bookUpdatePOST = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = [req.body.genre]
    }
    next()
  },
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('summary', 'Summary must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('isbn', 'ISBN must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('genre.*')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const book = new Book(req.body)
    book.genre = typeof req.body.genre === 'undefined' ? [] : req.body.genre
    book._id = req.params.id
    if (!errors.isEmpty()) {
      const [authors, genres] = await Promise.all([
        Author.find(),
        Genre.find()
      ])
      for (const genre of genres) {
        if (book.genre.includes(genre._id)) genre.checked = 'true'
      }
      return res.json({ title: 'Update Book', errors: errors.array(), authors, genres, book })
    }
    await Book.findByIdAndUpdate(req.params.id, book);
    return res.redirect(book.url)
  })]