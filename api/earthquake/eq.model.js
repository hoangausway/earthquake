/*
  Model Layer
*/

import mongoose from 'mongoose'
import validator from '../../db/db.json-validator'

var Schema = mongoose.Schema

var EarthquakeSchema = new Schema(
  {
    type: validator.schemaStringRequired,
    properties: {
      mag: validator.schemaNumberRequired,
      place: validator.schemaStringRequired,
      time: validator.schemaNumberRequired,
      updated: validator.schemaNumberRequired,
      tz: validator.schemaNumberRequired,
      url: validator.schemaStringArrayRequired,
      detail: validator.schemaString,
      felt: validator.schemaNumber,
      cdi: validator.schemaNumber,
      mmi: validator.schemaNumber,
      alert: validator.schemaString,
      status: validator.schemaString,
      tsunami: validator.schemaNumber,
      sig: validator.schemaNumber,
      net: validator.schemaString,
      code: validator.schemaString,
      ids: validator.schemaString,
      sources: validator.schemaString,
      types: validator.schemaString,
      nst: validator.schemaNumber,
      dmin: validator.schemaNumber,
      rms: validator.schemaNumber,
      gap: validator.schemaNumber,
      magType: validator.schemaString,
      type: validator.schemaString,
      title: validator.schemaString
    },
    geometry: {
      type: validator.schemaStringRequired,
      coordinates: validator.schemaNumberArrayRequired
    },
    id: validator.schemaStringRequired
  }
)

const EQModel = mongoose.model('earthquakes', EarthquakeSchema)
export default EQModel
