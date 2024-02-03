const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const onlyAdmin = require('../middlewares/onlyAdmin')

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

const usersRoutes = Router()

usersRoutes.get('/', ensureAuthenticated, usersController.index)
usersRoutes.get('/info', ensureAuthenticated, usersController.show)
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.delete(
  '/:id',
  ensureAuthenticated,
  onlyAdmin,
  usersController.delete
)

module.exports = usersRoutes
