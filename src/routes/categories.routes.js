const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const Validator = require('../validators/CategoriesValidator')

const CategoriesController = require('../controllers/CategoriesController')
const categoriesController = new CategoriesController()

const categoriesRoutes = Router()
categoriesRoutes.use(ensureAuthenticated)

categoriesRoutes.get('/', Validator.base, categoriesController.index)
categoriesRoutes.get('/:id', Validator.base, categoriesController.show)
categoriesRoutes.post('/', Validator.post, categoriesController.create)
categoriesRoutes.put(
  '/relocate',
  Validator.relocate,
  categoriesController.relocate
)
categoriesRoutes.put('/:id', Validator.put, categoriesController.update)
categoriesRoutes.delete('/:id', Validator.delete, categoriesController.delete)

module.exports = categoriesRoutes
