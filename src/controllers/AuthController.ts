import { Request, Response } from 'express'
import * as authenticate from 'services/Authenticate'
import Controller from 'services/Controller'
import Users from 'models/Users'

export default class UsersController extends Controller {
  constructor() {
    super(Users)
  }

  public static get permits() {
    return ['login']
  }

  public async login(req: Request, res: Response) {
    const email = req.body.email
    const password = req.body.password
    return this.Model.login(email, password)
      .then((user: object) => {
        if (!user) return Promise.reject()
        const token = authenticate.sign({ email })
        return Promise.resolve({ token, user })
      })
      .then(this.responseDefault(res))
      .catch(() => {
        res.status(401)
        return res.json({ error: 'Invalid credentials' })
      })
  }
}
