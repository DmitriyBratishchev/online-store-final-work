const express = require('express')
const fsSync = require('fs')
const fs = require('fs/promises')
const path = require('path')
const router = express.Router({ mergeParams: true })

router.get('/:image', async (req, res, next) => {
  try {
    const options = {
      root: path.resolve('images'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    const { image } = req.params
    const imagePath = path.resolve('images/' + image)
    res.sendFile(fsSync.existsSync(imagePath) ? image : 'no-img.png', options, function(err) {
      if (err) {
        next(err)
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже. image'
    })
    next()
  }
})

router.post('/', async (req, res) => {
  try {
    const fileNameArr = req.files.image.name.replace(/[\s\(\)]+/g, '').split('.')
    const fileName = fileNameArr[0] + '_' + Date.now() + '.' + fileNameArr[1]
    const imagePath = path.resolve('images/' + fileName)
    req.files.image.mv(imagePath)
    res.status(201).send(fileName)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже. image'
    })
  }
})

router.delete('/:imageName', async (req, res) => {
  try {
    const {imageName} = req.params
    const imagePath = path.resolve('images/' + imageName)
    if (fsSync.existsSync(imagePath)) {
      fs.unlink(imagePath)
    } else (console.log('нет файла'))
    res.status(201).send(imageName)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже. image'
    })
  }
})

module.exports = router;
