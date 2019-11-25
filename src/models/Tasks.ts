import Model from 'services/Model'

export default class Tasks extends Model {
  static get tableName() {
    return 'tasks'
  }
}
