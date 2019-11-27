import { Request, Response } from 'express'
import Controller from 'services/Controller'
import Users from 'models/Users'

export default class UsersController extends Controller {
  constructor() {
    super(Users)
  }

  public static get permits() {
    return ['index', 'show', 'update', 'create', 'delete', 'email']
  }

  public async email(req: Request, res: Response) {
    const email = req.body.email
    if (!email) {
      res.status(401)
      return res.json({ error: 'Invalid credentials' })
    }
    return this.Model.findOne({ email })
      .then(this.responseDefault(res))
      .catch(this.responseNotFound(res))
  }
}
