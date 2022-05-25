const jwt = require('jsonwebtoken')
// const config = require('config')
const Token = require('../models/token')

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.NODE_ENV_ACCESS_SECRET, {
      expiresIn: 3600
    })

    const refreshToken = jwt.sign(payload, process.env.NODE_ENV_REFRESH_SECRET)
    return {accessToken, refreshToken, expiresIn: 3600}
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ userId })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }

    const token = await Token.create({ userId, refreshToken })
    return token
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.NODE_ENV_REFRESH_SECRET)
    } catch (error) {
      return null
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.NODE_ENV_ACCESS_SECRET)
    } catch (error) {
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({refreshToken})
    } catch (error) {
      return null
    }
  }
}

module.exports = new TokenService();