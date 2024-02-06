const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const Validator = require('../validators/TransfersValidator')

const TransfersController = require('../controllers/TransfersController')
const transfersController = new TransfersController()

const transfersRoutes = Router()
transfersRoutes.use(ensureAuthenticated)

transfersRoutes.get('/', transfersController.index)
transfersRoutes.get('/:id', transfersController.show)
transfersRoutes.post('/', Validator.post, transfersController.create)
transfersRoutes.put('/:id', Validator.put, transfersController.update)
transfersRoutes.delete('/:id', Validator.delete, transfersController.delete)

module.exports = transfersRoutes
