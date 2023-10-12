import type { Knex } from 'knex'
import config from '@common/config'

const knexFile: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/modules/database/${config.database.name}`,
    },
    migrations: {
      directory: `${__dirname}/modules/database/migrations`,
    },
    useNullAsDefault: true,
  },
}

export default knexFile
