// tslint:disable-next-line: no-var-requires
const config = require('../../knexfile')
import knex from 'knex'

const Database = knex(config)

export default Database
