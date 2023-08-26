const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const BookInstance = require('../models/bookInstance')
const Book = require('../models/book')

exports.bookInstanceList = asyncHandler(async (req, res, next) => {
  const bookInstanceList = await BookInstance.find()
    .populate('book', 'title')
  return res.json({ title: 'Book Instance List', bookInstanceList })
})

exports.bookInstanceDetail = asyncHandler(async (req, res, next) => {
  const { params } = req
  const bookInstance = await BookInstance.findById(params.id)
    .populate('book')
  if (bookInstance === null) {
    const err = new Error('Book copy not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: 'Book:', bookInstance })
})

exports.bookInstanceCreateGET = asyncHandler(async (req, res, next) => {
  const bookList = await Book.find()
    .select('title')
  return res.json({ title: 'Create BookInstance', bookList })
})

exports.bookInstanceCreatePOST = [
  body('book', 'Book must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status')
    .escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const bookInstance = new BookInstance(req.body)
    if (!errors.isEmpty()) {
      const bookList = await Book.find()
        .select('title')
      return res.json({
        title: 'Create BookInstance',
        errors: errors.array(),
        selectedBook: bookInstance.book?._id,
        bookList, bookInstance
      })
    }
    await bookInstance.save()
    return res.redirect(bookInstance.url)
  })]

exports.bookInstanceDeleteGET = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate('book')
  if (bookInstance === null) {
    return res.redirect('/catalog/bookinstances')
  }
  return res.json({ title: 'Delete BookInstance', bookInstance })
})

exports.bookInstanceDeletePOST = asyncHandler(async (req, res, next) => {
  await BookInstance.findByIdAndRemove(req.body.id)
  return res.redirect('/catalog/bookinstances')
})

exports.bookInstanceUpdateGET = asyncHandler(async (req, res, next) => {
  const [bookInstance, bookList] = await Promise.all([
    BookInstance.findById(req.params.id)
      .populate('book'),
    Book.find()
  ])
  if (bookInstance === null) {
    const err = new Error('Book copy not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: 'Update Book Instance', selectedBook: bookInstance.book?._id, bookList, bookInstance })
})

exports.bookInstanceUpdatePOST = [
  body('book', 'Book must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status')
    .escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const bookInstance = new BookInstance(req.body)
    bookInstance._id = req.params.id
    if (!errors.isEmpty()) {
      const bookList = await Book.find().select('title')
      return res.json({ title: 'Update BookInstance', errors: errors.array(), selectedBook: bookInstance.book?._id, bookList, bookInstance })
    }
    await BookInstance.findByIdAndUpdate(req.params.id, bookInstance)
    return res.redirect(bookInstance.url)
  })]