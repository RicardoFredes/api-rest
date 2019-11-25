import Database from 'services/Database'

export default class Model {
  private table: string

  constructor(table: string) {
    this.table = table
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
    return this.insertGetId(data)
  }

  public update(id: number, data: object) {
    return this.db.where({ id }).update(data)
  }

  public delete(id: number) {
    return this.db
      .where({ id })
      .delete()
      .then(() => ({ id }))
  }

  private async insertGetId(data: object) {
    return Database(this.table)
      .insert(data)
      .then((ids: Array<number>) => ({ id: ids[0] }))
  }

  private get db(): any {
    return Database(this.table)
  }
}
