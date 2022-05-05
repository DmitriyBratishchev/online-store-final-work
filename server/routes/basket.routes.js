const express = require('express')
const fs = require('fs/promises')
const auth = require('../middleware/auth.middleware')
const Catalog = require('../models/catalog')
const router = express.Router({ mergeParams: true })

const path = require('path')
const chalk = require('chalk')

router.get('/', async (req, res) => {
  console.log('catalog get');
  const  catalogIds  = req.body
  console.log('reqId', catalogIds);
  if (!catalogIds) {
    res.status(400).json({
      error: {
        message: 'BAD REQUEST',
        code: 400
      }
    })
  }
  try {
    const list = await Catalog.findById(catalogIds)
    res.status(200).send(list)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})