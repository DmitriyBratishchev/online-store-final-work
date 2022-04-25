const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDataBase = require('./startUp/initDataBase')
const fileUpload = require('express-fileupload')
const routes = require('./routes')

const app = express()
const PORT = config.get('port') ?? 8080

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload({}))
app.use(cors())
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  console.log('production');
} else {
  console.log('development');
}

async function start() {
  try {
    // mongoose.connection.once('open', () => {
    //   initDataBase()
    // })
    await mongoose.connect(config.get('mongooUri'))
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
