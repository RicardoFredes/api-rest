import { Request, Response } from 'express'

export default class Controller {
  protected Model: any

  constructor(Model: any) {
    this.Model = Model
    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
  }

  public static get permits() {
    return ['index', 'show', 'update', 'create', 'delete']
  }

  public async index(req: Request, res: Response) {
    return this.Model.all()
      .then(this.useMiddleware('index'))
      .then(this.responseDefault(res))
      .catch(this.responseNotFound(res))
  }

  public async show(req: Request, res: Response) {
    const id = req.params.id
    return this.Model.find(id)
      .then(this.useMiddleware('show'))
      .then(this.responseDefault(res))
      .catch(this.responseNotFound(res))
  }

  public async update(req: Request, res: Response) {
    const id = req.params.id
    const data = req.body
    return this.Model.update(id, data)
      .then(this.useMiddleware('update'))
      .then(this.responseDefault(res))
      .catch(this.responseNotValid(res))
  }

  public async create(req: Request, res: Response) {
    const data = req.body
    return await this.Model.create(data)
      .then(this.useMiddleware('create'))
      .then(this.responseDefault(res))
      .catch(this.responseNotValid(res))
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id
    return this.Model.delete(id)
      .then(this.useMiddleware('delete'))
      .then(this.responseMessage(res, 'Deleted is success'))
      .catch(this.responseNotValid(res))
  }

  public get middlewares(): any[] {
    return []
  }

  protected useMiddleware(action: string) {
    const middleware = this.middlewares.find(
      (item: { action: string }) => item.action === action
    )
    return (response: any) => {
      if (middleware) return middleware.parser(response)
      return response
    }
  }

  protected responseDefault(res: Response) {
    return (result: any) => {
      if (!result) this.responseNotFound(res)()
      return res.json(result)
    }
  }

  protected responseMessage(res: Response, message: string) {
    return () => res.json({ message })
  }

  protected responseNotFound(res: Response) {
    return () => {
      res.status(404)
      return res.json({ message: 'Not Found' })
    }
  }

  protected responseNotValid(res: Response) {
    return (message: object) => {
      res.status(422)
      const error = { ...message, statusCode: 422 }
      return res.json({ error })
    }
  }
}
