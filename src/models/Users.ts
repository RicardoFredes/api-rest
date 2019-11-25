import Model from 'services/Model'

export default class Users extends Model {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 50 },
        password: { type: 'string', minLength: 1, maxLength: 16 },
        thumbnail: { type: 'string' },
      }
    }
  }
}
