import mongoose from 'mongoose'
import ConfigEnv from '../config/config.env'

const DbConnect = () => {
  return mongoose.connect(ConfigEnv.dbUrl, { useNewUrlParser: true, useFindAndModify: false })
}

export default DbConnect
