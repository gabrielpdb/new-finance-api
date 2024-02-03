const { compare } = require('bcryptjs')
const { Account } = require('../models/Account')
const AppError = require('../utils/AppError')
const { User } = require('../models/User')

module.exports = {
  async post(req, res, next) {
    const { name, email, password } = req.body

    if (!name) {
      throw new AppError('Informe o seu nome')
    }

    if (!password) {
      throw new AppError('Informe uma senha')
    }

    if (!email) {
      throw new AppError('Informe um email')
    }

    const emailAlreadyInUse = await User.getByEmail({ email })

    if (emailAlreadyInUse) {
      throw new AppError('Email já está em uso')
    }

    next()
  },

  async put(req, res, next) {
    const user_id = req.user.id
    const { name, email, old_password, new_password } = req.body

    const user = await User.getById({ id: user_id })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    req.body.user = user

    if (!name) {
      throw new AppError('Informe o seu nome')
    }

    if (!email) {
      throw new AppError('Informe o seu email')
    }

    const userWithUpdatedEmail = await User.getByEmail({ email })

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso')
    }

    if ((new_password && !old_password) || (old_password && !new_password)) {
      throw new AppError(
        'Você precisa informar a senha antiga e a nova senha para redefinir a senha'
      )
    }

    if (new_password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere')
      }
    }

    next()
  },

  async delete(req, res, next) {
    const { id } = req.params

    const user = await User.getById({ id })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    next()
  }
}
