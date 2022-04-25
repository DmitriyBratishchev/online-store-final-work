const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

router.get('/:userId', auth, async (req, res) => {
  console.log('/user/id get');
  try {
    const { userId } = req.params
    const userById = await User.findById(userId)
    res.status(200).send(userById)

  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }

})

// {
  //   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA2NmVhZTZkMzI2YzkwZWEyMGRlMDgiLCJpYXQiOjE2NDQ1ODg3MTgsImV4cCI6MTY0NDU5MjMxOH0.VtZuVYrvQ9c0TH1X9K_0EXLw-lr_-k8SK2obGlSeRPc",
  //   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA2NmVhZTZkMzI2YzkwZWEyMGRlMDgiLCJpYXQiOjE2NDQ1ODg3MTh9.fGpp2KexzTv6mS1nw5XBE9tuQ_nsw-c0kdHhcVcachc",
  //   "expiresIn": 3600,
  //   "usedId": "62066eae6d326c90ea20de08"
  // }

  router.patch('/:userId', auth, async (req, res) => {
    console.log('/user/id patch');
    try {
      const { userId } = req.params

    if (userId) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
      res.status(200).send(updatedUser)
    } else (
      res.status(401).json({message: 'Unauthorized'})
    )

  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

module.exports = router;