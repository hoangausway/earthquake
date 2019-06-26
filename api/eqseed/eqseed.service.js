/*
  Service Layer
*/

import axios from 'axios'

import ConfigSettings from '../../config/config.settings'
import EQModel from '../earthquake/eq.model'

/*
  Fetch earthquakes using url defined in ConfigSettings
  Save to local db, return Promise
*/
const fetch = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(ConfigSettings.fetchUrl)
      .then(response => EQModel.collection.insertMany(response.data.features || []))
      .then(r => resolve({ status: 'OK', count: r.insertedCount }))
      .catch(e => reject(e))
  })
}

/*
  Delete earthquakes collection
*/
const purge = () => {
  return new Promise((resolve, reject) => {
    EQModel.collection
      .drop()
      .then(r => resolve({ status: 'OK' }))
      .catch(e => reject(e))
  })
}

const EQSeedService = {
  fetch: fetch,
  purge: purge
}

export default EQSeedService
