const Author = require('../models/author')
const Book = require('../models/book')
const asyncHandler = require('express-async-handler')

exports.authorList = asyncHandler(async (req, res, next) => {
  const authorList = await Author.find()
    .sort('family_name')
  return res.json({ title: 'Author List', authorList })
})

exports.authorDetail = asyncHandler(async (req, res, next) => {
  const { params } = req
  const [author, authorBooks] = await Promise.all([
    Author.findById(params.id),
    Book.find()
      .where('author').equals(params.id)
      .select('title summary')
  ])
  if (author === null) {
    const err = new Error('Author not found')
    err.status = 404
    return next(err)
  }
  res.json({ title: 'Author Detail', author, authorBooks })
})

exports.authorCreateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create GET')
})

exports.authorCreatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create POST')
})

exports.authorDeleteGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete GET')
})

exports.authorDeletePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete POST')
})

exports.authorUpdateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update GET')
})

exports.authorUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update POST')
})