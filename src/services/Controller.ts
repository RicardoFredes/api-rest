import { Request, Response } from 'express'

export default class Controller {
  Model: any

  constructor(Model: any) {
    this.Model = new Model()
    this.index = this.index.bind(this)
  }

  async index(req: Request, res: Response) {
    const response = await this.Model.all()
    return res.json(response)
  }
}
