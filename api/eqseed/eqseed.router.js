/*
  Earthquake SEED API routing
  Routes fetch and purge requests for seeding local database.
  fetch: connect to earthquake.usgs.gov and download first latest 100 records
  purge: erase collection 'earthquakes'

  As general architecture, there are few layers to process and response to requests:
  - eqseed.router.js
      routing: this layer
  - eqseed.middleware.js
      preprocessing: middleware layer
  - eqseed.service.js
      performing: service layer
  - The model layer is shared from eq.model.js in Earthquake API

*/
import { Router } from 'express'

import EQSeedMiddleware from './eqseed.middleware'

const EQSeedRouter = Router()

EQSeedRouter.get('/fetch', EQSeedMiddleware.fetch, (req, res) => {
  res.status(200).json(req.response)
})

EQSeedRouter.post('/purge', EQSeedMiddleware.purge, (req, res) => {
  res.status(200).json(req.response)
})

export default EQSeedRouter
