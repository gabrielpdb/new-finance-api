const { Router } = require('express')

const usersRoutes = require('./users.routes')
const sessionsRoutes = require('./sessions.routes')
const accountsRoutes = require('./accounts.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/login', sessionsRoutes)
routes.use('/accounts', accountsRoutes)

module.exports = routes
