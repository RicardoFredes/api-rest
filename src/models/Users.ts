import Model from 'services/Model'
import bcrypt from 'bcrypt'

export default class Users extends Model {
  static get tableName() {
    return 'users'
  }

  static get only() {
    return [ 'name', 'email' ]
  }

  public static create(data: any): Promise<any> {
    const password = data.password
    if (password) data.password = bcrypt.hashSync(password, 10)
    return super.create(data)
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3, maxLength: 50 },
        password: { type: 'string', minLength: 6, maxLength: 255 },
        thumbnail: { type: 'string' },
      },
    }
  }
}
