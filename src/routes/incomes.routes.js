const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const Validator = require('../validators/IncomesValidator')

const IncomesController = require('../controllers/IncomesController')
const incomesController = new IncomesController()

const incomesRoutes = Router()
incomesRoutes.use(ensureAuthenticated)

incomesRoutes.get('/', incomesController.index)
incomesRoutes.get('/:id', incomesController.show)
incomesRoutes.post('/', Validator.post, incomesController.create)
incomesRoutes.put('/:id', Validator.put, incomesController.update)
incomesRoutes.delete('/:id', Validator.delete, incomesController.delete)

module.exports = incomesRoutes
