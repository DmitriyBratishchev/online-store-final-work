const express = require('express')
const auth = require('../middleware/auth.middleware')
const Catalog = require('../models/catalog')
const router = express.Router({ mergeParams: true })

const path = require('path')


router.get('/', async (req, res) => {
  console.log('catalog get');
  try {
    const list = await Catalog.find()
    res.status(200).send(list)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

router.post('/', async (req, res) => {
  console.log('catalog post', req.body);
  // console.log('file', req.files);
  try {
    // const imagePath = path.resolve('images/' + req.files.images.name)
    // console.log(imagePath );
    // req.files.images.mv(imagePath)
    // res.status(201).json({data: imagePath})

    const newGoods = await Catalog.create({
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRH7xQpMdQnGTADXlPUefASh0Oj3o-AUO3CGOj89wtgotPKb5JiIcWgI-Ik9fFxZSJ1Qc&usqp=CAU'],
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

    const deleteGoods = await Catalog.findByIdAndDelete(catalogId)
    console.log('delete goods', deleteGoods);
    res.status(200).send(deleteGoods)

  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

module.exports = router;