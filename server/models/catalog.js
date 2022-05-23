const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  numberOfGoods: {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
})

module.exports = model('Catalog', schema)
