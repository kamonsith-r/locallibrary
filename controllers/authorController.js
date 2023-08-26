const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Author = require('../models/author')
const Book = require('../models/book')

exports.authorList = asyncHandler(async (req, res, next) => {
  const authorList = await Author.find().sort('family_name')
  return res.json({ title: 'Author List', authorList })
})

exports.authorDetail = asyncHandler(async (req, res, next) => {
  const [author, authorBooks] = await Promise.all([
    Author.findById(req.params.id),
    Book.find().where('author').equals(req.params.id).select('title summary')
  ])
  if (author === null) {
    const err = new Error('Author not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: 'Author Detail', author, authorBooks })
})

exports.authorCreateGET = asyncHandler(async (req, res, next) => {
  return res.json({ title: 'Create Author' })
})

exports.authorCreatePOST = [
  body('first_name')
    .trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ values: 'falsy' }).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death')
    .optional({ values: 'falsy' }).isISO8601().toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const author = new Author(req.body)
    if (!errors.isEmpty()) {
      return res.json({ title: 'Create Author', errors: errors.array(), author })
    }
    await author.save()
    return res.redirect(author.url)
  })]

exports.authorDeleteGET = asyncHandler(async (req, res, next) => {
  const [author, authorBooks] = await Promise.all([
    Author.findById(req.params.id),
    Book.find().where('author').equals(req.params.id).select('title summary')
  ])
  if (author === null) {
    return res.redirect('/catalog/authors')
  }
  return res.json({ title: 'Delete Author', author, authorBooks })
})

exports.authorDeletePOST = asyncHandler(async (req, res, next) => {
  const [author, authorBooks] = await Promise.all([
    Author.findById(req.params.id),
    Book.find().where('author').equals(req.params.id).select('title summary')
  ])
  if (authorBooks.length > 0) {
    return res.json({ title: 'Delete Author', author, authorBooks })
  }
  await Author.findByIdAndRemove(req.body.authorid)
  return res.redirect('/catalog/authors')
})

exports.authorUpdateGET = asyncHandler(async (req, res, next) => {
  const author = await Author.findById(req.params.id)
  if (author === null) {
    const err = new Error('Author not found')
    err.status = 404
    return next(err)
  }
  return res.json({ title: 'Update Author', author })
})

exports.authorUpdatePOST = [
  body('first_name')
    .trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ values: 'falsy' }).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death').optional({ values: 'falsy' }).isISO8601().toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const author = new Author(req.body)
    author._id = req.params.id
    if (!errors.isEmpty()) {
      return res.json({ title: 'Update Author', errors: errors.array(), author })
    }
    await Author.findByIdAndUpdate(req.params.id, author)
    return res.redirect(author.url)
  })]