const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const onlyAdmin = require('../middlewares/onlyAdmin')
const Validator = require('../validators/UsersValidator')

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

const usersRoutes = Router()

usersRoutes.get('/', ensureAuthenticated, onlyAdmin, usersController.index)
usersRoutes.get('/info', ensureAuthenticated, usersController.show)
usersRoutes.post('/', Validator.post, usersController.create)
usersRoutes.put('/', ensureAuthenticated, Validator.put, usersController.update)
usersRoutes.delete(
  '/:id',
  ensureAuthenticated,
  onlyAdmin,
  Validator.delete,
  usersController.delete
)

module.exports = usersRoutes
