const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const onlyAdmin = require('../middlewares/onlyAdmin')

const AdminController = require('../controllers/AdminController')
const adminController = new AdminController()

const adminRoutes = Router()
adminRoutes.use(ensureAuthenticated)
adminRoutes.use(onlyAdmin)

adminRoutes.get(
  '/checkAllAccountsBalance',
  adminController.checkAllAccountsBalance
)

module.exports = adminRoutes
