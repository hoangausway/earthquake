/*
  Service Layer
*/

import EQModel from './eq.model'

const createEarthquake = earthquake => EQModel.create(earthquake)

const readEarthquake = objectId => EQModel.findById(objectId).exec()

const updateEarthquake = (objectId, earthquake) =>
  EQModel.findByIdAndUpdate(objectId, earthquake, { new: true }).exec()

const deleteEarthquake = objectId => EQModel.findByIdAndRemove(objectId).exec()

const listEarthquakes = () => EQModel.find({}).exec()

const readEarthquakeById = id => EQModel.findOne({ id: id }).exec()

const highestMag = (topNumber, timeStart, timeEnd) => {
  return EQModel.find({ 'properties.time': { $gt: timeStart, $lt: timeEnd } })
    .sort({ 'properties.mag': -1 })
    .limit(topNumber)
    .exec()
}

const updateTitleAndMagByEarthquakeId = (id, title, mag) => {
  return EQModel.findOneAndUpdate(
    { id: id },
    { $set: { 'properties.title': title, 'properties.mag': mag } },
    { new: true, runValidators: true }
  ).exec()
}

const EQService = {
  createEarthquake: createEarthquake,
  readEarthquake: readEarthquake,
  updateEarthquake: updateEarthquake,
  deleteEarthquake: deleteEarthquake,
  listEarthquakes: listEarthquakes,
  readEarthquakeById: readEarthquakeById,
  highestMag: highestMag,
  updateTitleAndMagByEarthquakeId: updateTitleAndMagByEarthquakeId
}

export default EQService
