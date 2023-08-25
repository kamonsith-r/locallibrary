const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  }
})

schema.virtual('url')
  .get(function () {
    return `/catalog/genre/${this._id}`
  })

module.exports = mongoose.model('Genre', schema)