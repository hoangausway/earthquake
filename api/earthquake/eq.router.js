/*
  Earthquake API routing
  Routes requests to standard CRUD and listing tasks
  Routes custom requests for custom tasks:
  - get earthquake info given earthquake id defined by USGS
  - get top ten highest magnitudes within last 24 hours, last 30 days, last 60 days
  - update Title and Magnitude of an existing earthquake record

  As general architecture, there are few layers to process and response to requests:
  - eq.router.js
      routing: this layer
  - eq.middleware.js
      preprocessing: middleware layer
  - eq.service.js
      performing: service layer
  - eq.model.js
      database manipulating layer
*/
import { Router } from 'express'
import EQMiddleware from './eq.middleware'

const EQRouter = Router()

/*
  Standard CRUD
*/
EQRouter.post('/', EQMiddleware.createEarthquake, (req, res) => {
  res.status(201).json(req.response)
})

EQRouter.get('/:objectId', EQMiddleware.readEarthquake, (req, res) => {
  res.status(200).json(req.response)
})

EQRouter.put('/:objectId', EQMiddleware.updateEarthquake, (req, res) => {
  res.status(200).json(req.response)
})

EQRouter.delete('/:objectId', EQMiddleware.deleteEarthquake, (req, res) => {
  res.status(200).json(req.response)
})

EQRouter.get('/', EQMiddleware.listEarthquakes, (req, res) => {
  res.status(200).json(req.response)
})
/* End CRUD */

// GET an earthquake by ID
EQRouter.get('/id/:id', EQMiddleware.readEarthquakeById, (req, res) => {
  res.status(200).json(req.response)
})

// GET top ten highest magnitude earthquakes within the last 24 hours
EQRouter.get('/search/top10HighestMagPast24Hours', EQMiddleware.top10HighestMagPast24Hours, (req, res) => {
  res.status(200).json(req.response)
})

// GET top ten highest magnitude earthquakes within the last 30 days
EQRouter.get('/search/top10HighestMagPast30Days', EQMiddleware.top10HighestMagPast30Days, (req, res) => {
  res.status(200).json(req.response)
})

// GET top ten highest magnitude earthquakes within the last 60 days
EQRouter.get('/search/top10HighestMagPast60Days', EQMiddleware.top10HighestMagPast60Days, (req, res) => {
  res.status(200).json(req.response)
})

// POST update title and magnitude of an existing earthquake defined by earthquake's id
EQRouter.post('/id/:id', EQMiddleware.updateTitleAndMagByEarthquakeId, (req, res) => {
  res.status(200).json(req.response)
})

export default EQRouter
