import Database from 'services/Database'

export default class Model {
  db: any

  constructor(table: string) {
    this.db = Database(table)
  }

  all() {
    return this.db.select()
  }

  find(id: number) {
    return this.db
      .first()
      .where({ id })
      .then((data: any) =>
        data ? data : Promise.reject(new Error('Content Not Found'))
      )
  }

  findBy(column: string, value: any) {
    return this.db
      .first()
      .where({ [column]: value })
      .then((data: any) =>
        data ? data : Promise.reject(new Error('Content Not Found'))
      )
  }

  create(data: object) {
    return this.db.insert(data)
  }

  update(data: object, id: number) {
    return this.db.update(data).where({ id })
  }

  delete(id: number) {
    return this.db
      .where({ id })
      .delete()
      .then(() => ({ id }))
  }
}
