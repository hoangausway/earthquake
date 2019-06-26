import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import ConfigEnv from './config/config.env'
import DbConnect from './db/db.connect'
import EQRouter from './api/earthquake/eq.router'
import EQSeedRouter from './api/eqseed/eqseed.router'

const app = express()

// preprocessing
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// routes
app.use('/eqseed', EQSeedRouter)
app.use('/earthquakes', EQRouter)

// get app info
app.get('/', function (req, res) {
  var pkg = require(path.join(__dirname, 'package.json'))
  res.json({
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    status: 'up'
  })
})

// connect database then start the app
DbConnect().then(async () => {
  app.listen(ConfigEnv.port, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
  )
})
