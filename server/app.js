require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const initDataBase = require('./startUp/initDataBase')
const fileUpload = require('express-fileupload')
const routes = require('./routes')

const app = express()
const PORT = process.env.NODE_ENV_PORT ?? 8080

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload({}))
app.use(cors())
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  console.log('production');
  app.use('/', express.static(path.join(__dirname, 'client')));
  const indexPath = path.join(__dirname, 'client', 'index.html')
  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
} else {
  console.log('development');
}

async function start() {
  try {
    // инициализация базы данных
    // mongoose.connection.once('open', () => {
    //   initDataBase()
    // })
    await mongoose.connect(process.env.NODE_ENV_MONGOO_URI)
    console.log(chalk.green(`MongoDB подключена.`))
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT} ...`))
    )
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1)
  }
}

start()
