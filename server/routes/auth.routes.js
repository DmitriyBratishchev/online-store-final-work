const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const tokenService = require('../services/token.service')
const router = express.Router({ mergeParams: true })

router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = req.body
    const existUser = await User.findOne({ email })

    if (existUser) {
      res.status(400).json({
        error: {
          message: 'EMAIL_EXISTS',
          code: 400
        }
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      name: "User",
      image: "http//image",
      basket: [],
      favorites: [],
      ...req.body,
      password: hashedPassword
    })

    const tokens = tokenService.generate({ _id: newUser._id })
    await tokenService.save(newUser._id, tokens.refreshToken)

    res.status(201).send({...tokens, usedId: newUser._id})


  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

router.post('/signInWithPassword', async (req, res) => {

})

router.post('/token', async (req, res) => {

})

module.exports = router;