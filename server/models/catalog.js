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


// {
//   "name": "Стол",
//   "price": 300,
//   "numberOfGoods": 5,
//   "category": "3",
//   "id": "Gzk50Zs"
// },