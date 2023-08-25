const BookInstance = require('../models/bookInstance')
const asyncHandler = require('express-async-handler')

exports.bookInstance_list = asyncHandler(async (req, res, next) => {
  const bookInstanceList = await BookInstance.find()
    .populate('book', 'title')
  return res.json({ title: 'Book Instance List', bookInstanceList })
})

exports.bookInstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`)
})

exports.bookInstance_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET')
})

exports.bookInstance_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST')
})

exports.bookInstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET')
})

exports.bookInstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST')
})

exports.bookInstance_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET')
})

exports.bookInstance_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST')
})