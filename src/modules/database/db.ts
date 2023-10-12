import knex from 'knex'
import config from '@common/config'
import knexFile from '../../knexfile'

const options = knexFile[config.server.nodeEnv]

export default knex(options)
