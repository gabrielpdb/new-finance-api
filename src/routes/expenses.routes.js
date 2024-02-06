const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const Validator = require('../validators/ExpensesValidator')

const ExpensesController = require('../controllers/ExpensesController')
const expensesController = new ExpensesController()

const expensesRoutes = Router()
expensesRoutes.use(ensureAuthenticated)

expensesRoutes.get('/', expensesController.index)
expensesRoutes.get('/:id', expensesController.show)
expensesRoutes.post('/', Validator.post, expensesController.create)
expensesRoutes.put('/:id', Validator.put, expensesController.update)
expensesRoutes.delete('/:id', Validator.delete, expensesController.delete)

module.exports = expensesRoutes
