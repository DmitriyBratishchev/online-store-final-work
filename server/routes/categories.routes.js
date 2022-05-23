const express = require('express')
const Categories = require('../models/categories')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const list = await Categories.find()
    res.status(200).send(list)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

router.put('/:idCategory', async (req, res) => {
  try {
    const { idCategory } = req.params
    if (!idCategory) {
      res.status(400).json({
        error: {
          message: 'BAD REQUEST',
          code: 400
        }
      })
    }

    const categoryUpdate = await Categories.findByIdAndUpdate(idCategory, req.body, { new: true });
    res.status(200).send(categoryUpdate)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.',
      code: 500
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newCategory = await Categories.create(req.body)
    res.status(201).send(newCategory)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.',
      code: 500
    })
  }
})

module.exports = router;