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
    amount: Number
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

// const user = {
//   name: "Dima",
//   email: "d@mail.ru",
//   password: "Test1234",
//   image: "http//image",
//   basket: [{ productId: "Gzk50Zs", amount: 2 }],
//   favorites: ["Gzk50Zs"]
// }