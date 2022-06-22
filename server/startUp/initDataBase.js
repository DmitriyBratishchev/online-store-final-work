
const catalogModel = require('../models/catalog')
const categoriesModel = require('../models/categories')
const catalogMock = require('../mock/catalog.json')
const categoriesMock = require('../mock/categories.json')

module.exports = async () => {
  console.log('new base');
  const catalog = await catalogModel.find()
  // if (catalog.length !== catalogMock.length) {
    await createInitialEntity(catalogModel, catalogMock)
  // }

  const categories = await categoriesModel.find()
  // if (categories.length !== categoriesMock.length) {
    await createInitialEntity(categoriesModel, categoriesMock)
  // }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async el => {
      try {
        delete el.id
        const newEl = new Model(el)
        await newEl.save()
        return newEl
      } catch (er) {
        return er
      }
    })
  )
}