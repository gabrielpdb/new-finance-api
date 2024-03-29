const { Router } = require('express')

const adminRoutes = require('./admin.routes')
const usersRoutes = require('./users.routes')
const incomesRoutes = require('./incomes.routes')
const expensesRoutes = require('./expenses.routes')
const sessionsRoutes = require('./sessions.routes')
const accountsRoutes = require('./accounts.routes')
const tranfersRoutes = require('./transfers.routes')
const categoriesRoutes = require('./categories.routes')

const routes = Router()

routes.use('/admin', adminRoutes)
routes.use('/users', usersRoutes)
routes.use('/login', sessionsRoutes)
routes.use('/incomes', incomesRoutes)
routes.use('/expenses', expensesRoutes)
routes.use('/accounts', accountsRoutes)
routes.use('/transfers', tranfersRoutes)
routes.use('/income_categories', categoriesRoutes)
routes.use('/expense_categories', categoriesRoutes)

module.exports = routes
