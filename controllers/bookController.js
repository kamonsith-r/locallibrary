const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')
const asyncHandler = require('express-async-handler')

exports.index = asyncHandler(async (req, res, next) => {
  const [bookCount, bookInstanceCount, bookInstanceAvailableCount, authorCount, genreCount]
    = await Promise.all([
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: 'Available' }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ])
  return res.json({
    title: 'Local Library Home',
    bookCount, bookInstanceCount, bookInstanceAvailableCount, authorCount, genreCount
  })
})

exports.book_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book list')
})

exports.book_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
})

exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book create GET')
})

exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book create POST')
})

exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book delete GET')
})

exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book delete POST')
})

exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book update GET')
})

exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Book update POST')
})
