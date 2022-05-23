const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  basket: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Catalog',
    },
    count: Number
  }],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Catalog',
    }
  ]
}, {
  timestamps: true
})

module.exports = model('User', schema)
