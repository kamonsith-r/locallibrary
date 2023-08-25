const BookInstance = require('../models/bookInstance')
const asyncHandler = require('express-async-handler')

exports.bookInstanceList = asyncHandler(async (req, res, next) => {
  const bookInstanceList = await BookInstance.find()
    .populate('book', 'title')
  return res.json({ title: 'Book Instance List', bookInstanceList })
})

exports.bookInstanceDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`)
})

exports.bookInstanceCreateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET')
})

exports.bookInstanceCreatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST')
})

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