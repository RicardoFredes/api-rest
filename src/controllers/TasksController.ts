import Controller from 'services/Controller'
import Tasks from 'models/Tasks'

export default class TasksController extends Controller {
  constructor() {
    super(Tasks)
  }
}
