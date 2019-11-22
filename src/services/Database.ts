import knex from 'knex'
import config from 'config/knexfile'

const Database = knex(config)

export default Database
