import { Request, Response } from 'express'

export default class Controller {
  private Model: any
  private _permits: string[] = ['index', 'show', 'update', 'create', 'delete']

  constructor(Model: any, permits?: string[]) {
    this.Model = new Model()
    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.create = this.create.bind(this)
    if (permits) this.permits = permits
  }

  public async index(req: Request, res: Response) {
    const response = await this.Model.all()
    return res.json(response)
  }

  public async show(req: Request, res: Response) {
    const id = req.params.id
    return this.Model.find(id)
      .then((result: object) => res.json(result))
      .catch(() => this.responseNotFound(res))
  }

  public async update(req: Request, res: Response) {
    const id = req.params.id
    const data = req.body
    await this.Model.update(id, data)
    return this.Model.find(id).then((result: object) => res.json(result))
  }

  public async create(req: Request, res: Response) {
    const data = req.body
    const result = await this.Model.create(data)
    return this.Model.find(result.id).then((result: object) => res.json(result))
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id
    return this.Model.delete(id).then(() =>
      res.json({ message: 'Deleted is success' })
    )
  }

  public get permits() {
    return this._permits
  }

  public set permits(permits: string[]) {
    this._permits = permits
  }

  private responseNotFound(res: Response) {
    res.status(404)
    return res.json({ message: 'Not Found ' })
  }
}
