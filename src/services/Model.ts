import ObjectionModel from 'services/ObjectionModel'

export default class Model extends ObjectionModel {
  public static all() {
    return this.query()
  }

  public static find(id: number) {
    return this.query().findById(id)
  }

  public static create(data: object) {
    return this.query().insert(data)
  }

  public static update(id: number, data: object) {
    return this.query().findById(id).patch(data)
  }

  public static delete(id: number) {
    return this.query().deleteById(id)
  }

}
