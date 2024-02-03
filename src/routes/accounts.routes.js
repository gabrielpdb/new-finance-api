const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const Validator = require('../validators/AccountsValidator')

const AccountsController = require('../controllers/AccountsController')
const accountsController = new AccountsController()

const accountsRoutes = Router()
accountsRoutes.use(ensureAuthenticated)

accountsRoutes.get('/', accountsController.index)
accountsRoutes.get('/:id', accountsController.show)
accountsRoutes.post('/', Validator.post, accountsController.create)
accountsRoutes.put('/:id', Validator.put, accountsController.update)
accountsRoutes.delete('/:id', Validator.delete, accountsController.delete)

module.exports = accountsRoutes
