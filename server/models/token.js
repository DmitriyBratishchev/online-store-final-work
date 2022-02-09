const { Schema, model } = require('mongoose')

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  exporesIn: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

module.exports = model('Auth', schema)