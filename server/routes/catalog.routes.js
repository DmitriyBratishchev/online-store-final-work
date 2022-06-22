const express = require('express')
const fs = require('fs/promises')
const auth = require('../middleware/auth.middleware')
const Catalog = require('../models/catalog')
const router = express.Router({ mergeParams: true })

const path = require('path')
const chalk = require('chalk')


router.get('/', async (req, res) => {
  try {
    const list = await Catalog.find()
    res.status(200).send(list)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

router.get('/:catalogId', async (req, res) => {
  const { catalogId } = req.params
  if (!catalogId) {
    res.status(400).json({
      error: {
        message: 'BAD REQUEST',
        code: 400
      }
    })
  }
  try {
    const list = await Catalog.findById( catalogId )
    res.status(200).send(list || {_id: catalogId, description: 'В данный момент товар не доступен. Возможно он был удалён базвозвратно.'})
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newGoods = await Catalog.create({
      ...req.body
    })
    res.status(201).send(newGoods)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

router.put('/:catalogId', async (req, res) => {
  try {
    const { catalogId } = req.params
    if (!catalogId) {
      res.status(400).json({
        error: {
          message: 'BAD REQUEST',
          code: 400
        }
      })
    }
    const updatedGoods = await Catalog.findByIdAndUpdate(catalogId, req.body, { new: true })
    res.status(200).send(updatedGoods)

  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

router.delete('/:catalogId', async (req, res) => {
  try {
    const { catalogId } = req.params
    if (!catalogId) {
      res.status(400).json({
        error: {
          message: 'BAD REQUEST',
          code: 400
        }
      })
    }

    const { images } = await Catalog.findById(catalogId);
    // if (images.length !== 0) {
    //   images.forEach(im => {
    //     try {
    //       const imagePath = path.resolve('images/' + im)
    //       fs.unlink(imagePath)
    //     }
    //     catch (error) {
    //       console.log(chalk.red('Файл ', im, ' удалить не получилось.'));
    //     }
    //   })
    // }
    const deleteGoods = await Catalog.findByIdAndDelete(catalogId)
    res.status(200).send(deleteGoods)

  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

module.exports = router;