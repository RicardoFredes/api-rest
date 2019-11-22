import Controllers from 'controllers/index'
import Router from 'services/Router'

const router = new Router(Controllers)

router.get('/users', 'UsersController.index')
router.get('/tasks', 'TasksController.index')

export default router.listen()
