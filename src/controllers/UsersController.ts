import Controller from 'services/Controller'
import Users from 'models/Users'

export default class UsersController extends Controller {
  constructor() {
    super(Users)
  }
}
