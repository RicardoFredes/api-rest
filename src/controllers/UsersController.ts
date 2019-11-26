import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import Controller from 'services/Controller'
import Users from 'models/Users'

export default class UsersController extends Controller {
  constructor() {
    super(Users)
  }

  public async create(req: Request, res: Response): Promise<any> {
    const password = req.body.password
    if (password) req.body.password = bcrypt.hashSync(password, 10)
    super.create(req, res)
  }

  public get middlewares() {
    return [
      { action: 'index', parser: this.middlewareAll },
      { action: 'show', parser: this.middlewareOne },
      { action: 'create', parser: this.middlewareOne },
      { action: 'update', parser: this.middlewareOne },
    ]
  }

  private middlewareAll = (response: object[]) => response.map(this.middlewareOne)

  private middlewareOne = (data: any) => ({
    name: data.name,
    email: data.email,
    thumbnail: data.thumbnail || null
  })

}
