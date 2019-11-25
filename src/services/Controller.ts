import { Request, Response } from 'express'

export default class Controller {
  private Model: any

  constructor(Model: any) {
    this.Model = Model
  }

  public static get permits() {
    return ['index', 'show', 'update', 'create', 'delete']
  }

  public index = async (req: Request, res: Response) => {
    const response = await this.Model.all()
    return res.json(response)
  }

  public show = async (req: Request, res: Response) => {
    const id = req.params.id
    return this.Model.find(id)
      .then((result: object) => res.json(result))
      .catch(() => this.responseNotFound(res))
  }

  public update = async (req: Request, res: Response) => {
    const id = req.params.id
    const data = req.body
    return this.Model.update(id, data).then((result: object) => res.json(result)).catch(this.responseNotValid(res))
  }

  public create = async (req: Request, res: Response) => {
    const data = req.body
    return await this.Model.create(data).then((result: object) => res.json(result)).catch(this.responseNotValid(res))
  }

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id
    return this.Model.delete(id).then(() =>
      res.json({ message: 'Deleted is success' })
    )
  }

  private responseNotFound(res: Response) {
    res.status(404)
    return res.json({ message: 'Not Found ' })
  }

  private responseNotValid(res: Response) {
    return (message: object) => {
      res.status(422)
      const error = { ...message, statusCode: 422 }
      return res.json({ error })
    }
  }
}
