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
  const bookList = await Book.find().select('title')
  return res.json({ title: 'Create BookInstance', bookList })
})

exports.bookInstanceCreatePOST = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape(),
  body('due_back', 'Invalid date').optional({ values: 'falsy' }).isISO8601().toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const bookInstance = new BookInstance(req.body)
    if (!errors.isEmpty()) {
      const bookList = await Book.find().select('title')
      return res.json({
        title: 'Create BookInstance',
        selectedBook: bookInstance.book?._id,
        errors: errors.array(),
        bookList, bookInstance
      })
    }
    await bookInstance.save()
    return res.redirect(bookInstance.url)
  })]

exports.bookInstanceDeleteGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET')
})

exports.bookInstanceDeletePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST')
})

exports.bookInstanceUpdateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET')
})

exports.bookInstanceUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST')
})