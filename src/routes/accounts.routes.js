const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const AccountsController = require('../controllers/AccountsController')
const accountsController = new AccountsController()

const accountsRoutes = Router()
accountsRoutes.use(ensureAuthenticated)

accountsRoutes.get('/', accountsController.index)
accountsRoutes.get('/:id', accountsController.show)
accountsRoutes.post('/', accountsController.create)
accountsRoutes.put('/:id', accountsController.update)
accountsRoutes.delete('/:id', accountsController.delete)

module.exports = accountsRoutes
