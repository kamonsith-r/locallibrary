const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  genre: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }]
}, {
  id: false,
  toJSON: { virtuals: true }
})

schema.virtual('url')
  .get(function () {
    return `/catalog/book/${this._id}`
  })

module.exports = mongoose.model('Book', schema)