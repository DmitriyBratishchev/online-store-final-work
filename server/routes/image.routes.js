const express = require('express')
const fs = require('fs/promises')
const path = require('path')
const Categories = require('../models/categories')
// const images = require('../images')
const router = express.Router({ mergeParams: true })

router.get('/:image', async (req, res, next) => {
  console.log('image');

  // const fileName = req.params.image
  console.log(path.resolve('images'));
  try {
    const options = {
      root: path.resolve('images'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    const {image} = req.params
    console.log('image в try', image);
    // const list = await Categories.find()
    res.sendFile(image, options, function(err) {
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
    console.log('image post', req.body);
    console.log('file', req.files);

    const imagePath = path.resolve('images/' + req.files.image.name)
    console.log(imagePath );
    req.files.image.mv(imagePath)
    res.status(201).send(req.files.image.name)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже. image'
    })
  }
})

router.delete('/:imageName', async (req, res) => {
  try {
    const {imageName} = req.params
    console.log('image post', req.body);
    // console.log('file', req.files);

    const imagePath = path.resolve('images/' + imageName)
    console.log(imagePath );
    fs.unlink(imagePath)
    res.status(201).send(imageName)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже. image'
    })
  }
})

module.exports = router;
// res.sendFile(
//   fileName, options, function(err) {
//     if (err) {
//       next(err)
//     } else {
//     console.log('Sent:', fileName)
//   }
// }
// )