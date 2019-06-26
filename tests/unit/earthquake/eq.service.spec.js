import EQService from '../../../api/earthquake/eq.service'
import EQModel from '../../../api/earthquake/eq.model'
import eqNew from '../../fixtures/earthquake/eqNew'
import eqCreated from '../../fixtures/earthquake/eqCreated'
import eqUpdated from '../../fixtures/earthquake/eqUpdated'
import earthquakes from '../../fixtures/earthquake/earthquakes'
import errorUnknown from '../../fixtures/error/errorUnknown'

import mongoose from 'mongoose'
import { expect } from 'chai'
import { mock } from 'sinon'
require('sinon-mongoose')

describe('EQService', () => {
  let modelMock = mock(EQModel)

  // setup and cleanup mock
  beforeEach(function () {
    modelMock = mock(EQModel)
  })
  afterEach(function () {
    modelMock.restore()
    mongoose.models = {}
    mongoose.modelSchemas = {}
    return mongoose.connection.close()
  })

  // createEarthquake: failure and success
  describe('createEarthquake', () => {
    it('should raise error while creating new earthquake', () => {
      modelMock.expects('create')
        .withArgs(eqNew)
        .rejects(errorUnknown)

      return EQService.createEarthquake(eqNew)
        .catch(error => {
          modelMock.verify()
          expect(error).to.deep.equal(errorUnknown)
        })
    })

    it('should successfully create new earthquake', () => {
      modelMock.expects('create')
        .withArgs(eqNew)
        .resolves(eqCreated)

      return EQService.createEarthquake(eqNew)
        .then(data => {
          modelMock.verify()
          expect(data).to.deep.equal(eqCreated)
        })
    })
  })

  // readEarthquake: failure and success
  describe('readEarthquake', () => {
    it('should raise error while reading existing earthquake', () => {
      modelMock.expects('findById')
        .withArgs(eqCreated._id)
        .chain('exec')
        .rejects(errorUnknown)

      return EQService.readEarthquake(eqCreated._id)
        .catch(error => {
          modelMock.verify()
          expect(error).to.deep.equal(errorUnknown)
        })
    })

    it('should successfully read existing earthquake', () => {
      modelMock.expects('findById')
        .withArgs(eqCreated._id)
        .chain('exec')
        .resolves(eqCreated)

      return EQService.readEarthquake(eqCreated._id)
        .then(data => {
          modelMock.verify()
          expect(data).to.deep.equal(eqCreated)
        })
    })
  })

  // updateEarthquake: failure and success
  describe('updateEarthquake', () => {
    it('should raise error while updating existing earthquake', () => {
      modelMock.expects('findByIdAndUpdate')
        .withArgs(eqCreated._id, eqUpdated, { new: true })
        .chain('exec')
        .rejects(errorUnknown)

      return EQService.updateEarthquake(eqCreated._id, eqUpdated, { new: true })
        .catch(error => {
          modelMock.verify()
          expect(error).to.deep.equal(errorUnknown)
        })
    })

    it('should successfully update existing earthquake', () => {
      modelMock.expects('findByIdAndUpdate')
        .withArgs(eqCreated._id, eqUpdated, { new: true })
        .chain('exec')
        .resolves(eqUpdated)

      return EQService.updateEarthquake(eqCreated._id, eqUpdated, { new: true })
        .then(data => {
          modelMock.verify()
          expect(data).to.deep.equal(eqUpdated)
        })
    })
  })

  // deleteEarthquake: failure and success
  describe('deleteEarthquake', () => {
    it('should raise error while deleting existing earthquake', () => {
      modelMock.expects('findByIdAndRemove')
        .withArgs(eqCreated._id)
        .chain('exec')
        .rejects(errorUnknown)

      return EQService.deleteEarthquake(eqCreated._id)
        .catch(error => {
          modelMock.verify()
          expect(error).to.deep.equal(errorUnknown)
        })
    })

    it('should successfully delete existing earthquake', () => {
      modelMock.expects('findByIdAndRemove')
        .withArgs(eqCreated._id)
        .chain('exec')
        .resolves(eqCreated)

      return EQService.deleteEarthquake(eqCreated._id)
        .then(data => {
          modelMock.verify()
          expect(data).to.deep.equal(eqCreated)
        })
    })
  })

  // readEarthquakeById: failure and success
  describe('readEarthquakeById', () => {
    it('should raise error while reading existing earthquake by id', () => {
      modelMock.expects('findOne')
        .withArgs({ id: eqCreated.id })
        .chain('exec')
        .rejects(errorUnknown)

      return EQService.readEarthquakeById(eqCreated.id)
        .catch(error => {
          modelMock.verify()
          expect(error).to.deep.equal(errorUnknown)
        })
    })

    it('should successfully read existing earthquake by id', () => {
      modelMock.expects('findOne')
        .withArgs({ id: eqCreated.id })
        .chain('exec')
        .resolves(eqCreated)

      return EQService.readEarthquakeById(eqCreated.id)
        .then(data => {
          modelMock.verify()
          expect(data).to.deep.equal(eqCreated)
        })
    })
  })

  // highestMag: failure and success
  describe('highestMag', () => {
    const topNumber = 10
    const timeStart = 1561423822040 - 1
    const timeEnd = timeStart + 86400 + 1
    it('should raise error while finding topNumber of highest magnitudes in period (timeStart, timeEnd)', () => {
      modelMock.expects('find')
        .withArgs({ 'properties.time': { $gt: timeStart, $lt: timeEnd } })
        .chain('sort')
        .withArgs({ 'properties.mag': -1 })
        .chain('limit')
        .withArgs(topNumber)
        .chain('exec')
        .rejects(errorUnknown)

      return EQService.highestMag(topNumber, timeStart, timeEnd)
        .catch(error => {
          modelMock.verify()
          expect(error).to.deep.equal(errorUnknown)
        })
    })

    it('should successfully finding topNumber of highest magnitudes in period (timeStart, timeEnd)', () => {
      modelMock.expects('find')
        .withArgs({ 'properties.time': { $gt: timeStart, $lt: timeEnd } })
        .chain('sort')
        .withArgs({ 'properties.mag': -1 })
        .chain('limit')
        .withArgs(topNumber)
        .chain('exec')
        .resolves(earthquakes)

      return EQService.highestMag(topNumber, timeStart, timeEnd)
        .then(data => {
          modelMock.verify()
          expect(data).to.deep.equal(earthquakes)
        })
    })
  })
})
