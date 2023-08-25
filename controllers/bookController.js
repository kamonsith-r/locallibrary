const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookInstance')
const asyncHandler = require('express-async-handler')

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
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
})

exports.bookCreateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book create GET')
})

exports.bookCreatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book create POST')
})

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
