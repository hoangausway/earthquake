/*
  Middleware Layer
*/

import EQService from './eq.service'

const createEarthquake = (req, res, next) => {
  EQService.createEarthquake(req.body)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const listEarthquakes = (req, res, next) => {
  EQService.listEarthquakes()
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const readEarthquake = (req, res, next) => {
  EQService.readEarthquake(req.params.objectId)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const updateEarthquake = (req, res, next) => {
  EQService.updateEarthquake(req.params.objectId, req.body)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const deleteEarthquake = (req, res, next) => {
  EQService.deleteEarthquake(req.params.objectId)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const readEarthquakeById = (req, res, next) => {
  EQService.readEarthquakeById(req.params.id)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const top10HighestMagPast24Hours = (req, res, next) => {
  const now = Date.now()
  const past24Hours = now - 24 * 60 * 60
  EQService.highestMag(10, past24Hours, now)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const top10HighestMagPast30Days = (req, res, next) => {
  const now = Date.now()
  const past30Days = now - 30 * 24 * 60 * 60
  EQService.highestMag(10, past30Days, now)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const top10HighestMagPast60Days = (req, res, next) => {
  const now = Date.now()
  const past60Days = now - 60 * 24 * 60 * 60
  EQService.highestMag(10, past60Days, now)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const updateTitleAndMagByEarthquakeId = (req, res, next) => {
  EQService.updateTitleAndMagByEarthquakeId(req.params.id, req.body.title, req.body.mag)
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const EQMiddleware = {
  listEarthquakes: listEarthquakes,
  createEarthquake: createEarthquake,
  readEarthquake: readEarthquake,
  updateEarthquake: updateEarthquake,
  deleteEarthquake: deleteEarthquake,
  readEarthquakeById: readEarthquakeById,
  top10HighestMagPast24Hours: top10HighestMagPast24Hours,
  top10HighestMagPast30Days: top10HighestMagPast30Days,
  top10HighestMagPast60Days: top10HighestMagPast60Days,
  updateTitleAndMagByEarthquakeId: updateTitleAndMagByEarthquakeId
}

export default EQMiddleware
