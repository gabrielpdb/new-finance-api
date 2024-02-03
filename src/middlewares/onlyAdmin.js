const knex = require('../database/knex')
const AppError = require('../utils/AppError')

async function onlyAdmin(req, res, next) {
  const user_id = req.user.id

  const user = await knex('users').where({ id: user_id }).first()

  if (!user.is_admin) {
    throw new AppError('Recurso disponível somente a administradores', 401)
  }

  return next()
}

module.exports = onlyAdmin
