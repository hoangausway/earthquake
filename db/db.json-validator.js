/**
 * Created by hoang on 20/07/2015.
 * Updated 19/10/2017
 * Predefine Schema types helpers and a validation function used to validate json data
 */
import jsonschema from 'jsonschema'

const schemaValidate = jsonschema.validate

const validate = (instance, schema, cb) => {
  var errors = schemaValidate(instance, schema).errors
  if (errors.length > 0) {
    var errMessage = errors[0].message
    return cb && cb(new Error(errMessage))
  }
  cb && cb()
}
const validator = {
  validate: validate,
  schemaStringRequired: { 'type': 'string', 'required': true },
  schemaString: { 'type': 'string' },
  schemaStringArray: { 'type': 'array', 'items': { 'type': 'string' } },
  schemaStringArrayRequired: { 'type': 'array', 'items': { 'type': 'string' }, 'required': true },
  schemaNumberArrayRequired: { 'type': 'array', 'items': { 'type': 'number' }, 'required': true },
  schemaNumber: { 'type': Number },
  schemaNumberRequired: { 'type': Number, 'required': true }
}

export default validator
