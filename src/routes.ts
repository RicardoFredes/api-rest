import Controllers from 'controllers/index'
import Router from 'services/Router'

const router = new Router(Controllers)

router.get('/users/email', 'UsersController.email')
router.resources('/users', 'UsersController')
router.get('/tasks', 'TasksController.index')

export default router.listen()
