/*
  Middleware Layer
*/

import EQSeedService from './eqseed.service'

const fetch = (req, res, next) => {
  EQSeedService.fetch()
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const purge = (req, res, next) => {
  EQSeedService.purge()
    .then(data => {
      req.response = data
      next()
    })
    .catch(error => next(error))
}

const EQSeedMiddleware = {
  fetch: fetch,
  purge: purge
}

export default EQSeedMiddleware
