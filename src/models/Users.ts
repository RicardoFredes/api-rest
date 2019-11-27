import Model from 'services/Model'
import bcrypt from 'bcrypt'

export default class Users extends Model {
  static get tableName() {
    return 'users'
  }

  static get only() {
    return ['name', 'email', 'thumbnail']
  }

  public static create(data: any): Promise<any> {
    const password = data.password
    if (password) data.password = bcrypt.hashSync(password, 10)
    return super.create(data)
  }

  public static update(id: number, data: any): Promise<any> {
    const password = data.password
    if (password) data.password = bcrypt.hashSync(password, 10)
    return super.update(id, data)
  }

  public static async login(email: string, password: string): Promise<any> {
    return this.db
      .where({ email })
      .first()
      .then(user => {
        if (!user) {
          return Promise.reject({ error: 'Not found', statusCode: 404 })
        }
        return user
      })
      .then(async (user: any) => {
        const match = await bcrypt.compare(password, user.password)
        if (!match) return Promise.reject()
        return this.find(user.id)
      })
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
