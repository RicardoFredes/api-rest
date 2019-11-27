import ObjectionModel from 'services/ObjectionModel'

export default class Model extends ObjectionModel {
  public static get only(): any {
    return []
  }

  public static get db() {
    return this.query()
  }

  public static async all(): Promise<any> {
    return this.db.columns(this.only)
  }

  public static async find(id: number): Promise<any> {
    return this.db.findById(id).columns(this.only)
  }

  public static async findOne(query: object): Promise<any> {
    return this.db
      .where(query)
      .first()
      .columns(this.only)
  }

  public static async create(data: object): Promise<any> {
    return this.db.insert(data).then((result: any) => this.find(result.id))
  }

  public static async update(id: number, data: object): Promise<any> {
    return this.db.patchAndFetchById(id, data).then(() => this.find(id))
  }

  public static async delete(id: number): Promise<any> {
    return this.db.deleteById(id)
  }
}
