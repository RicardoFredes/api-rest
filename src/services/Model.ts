import Database from 'services/Database'

export default class Model {
  private db: any

  constructor(table: string) {
    this.db = Database(table)
  }

  public all() {
    return this.db.select()
  }

  public find(id: number) {
    return this.db
      .first()
      .where({ id })
      .then((data: any) =>
        data ? data : Promise.reject(new Error('Content Not Found'))
      )
  }

  public findBy(column: string, value: any) {
    return this.db
      .first()
      .where({ [column]: value })
      .then((data: any) =>
        data ? data : Promise.reject(new Error('Content Not Found'))
      )
  }

  public create(data: object) {
    return this.db.insert(data)
  }

  public update(data: object, id: number) {
    return this.db.update(data).where({ id })
  }

  public delete(id: number) {
    return this.db
      .where({ id })
      .delete()
      .then(() => ({ id }))
  }
}
