const Genre = require('../models/genre')
const asyncHandler = require('express-async-handler')

exports.genreList = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre list')
})

exports.genreDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`)
})

exports.genreCreateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre create GET')
})

exports.genreCreatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre create POST')
})

exports.genreDeleteGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete GET')
})

exports.genreDeletePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete POST')
})

exports.genreUpdateGET = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update GET')
})

exports.genreUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update POST')
})