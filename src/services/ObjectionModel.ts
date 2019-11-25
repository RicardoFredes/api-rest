import { Model as ObjectionModel } from 'objection'
import Knex from 'knex'

// tslint:disable-next-line: no-var-requires
const config = require('../../knexfile')

const knex = Knex(config)

ObjectionModel.knex(knex)

export default ObjectionModel
