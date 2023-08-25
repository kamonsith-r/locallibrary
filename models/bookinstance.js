const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  imprint: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance'
  },
  due_back: {
    type: Date,
    default: Date.now
  }
}, {
  id: false,
  toJSON: { virtuals: true }
})

schema.virtual('url')
  .get(function () {
    return `/catalog/bookInstance/${this._id}`
  })

module.exports = mongoose.model('BookInstance', schema)