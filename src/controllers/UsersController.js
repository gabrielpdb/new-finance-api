const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const { User } = require('../models/User')

class UsersController {
  async index(req, res) {
    const users = await User.getAll()

    if (users.length == 0) {
      throw new AppError('Nenhum usuário encontrado', 404)
    }

    return res.json(users)
  }

  async show(req, res) {
    const user_id = req.user.id

    const user = await User.getById({ id: user_id })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    return res.json(user)
  }

  async create(req, res) {
    const { name, email, password } = req.body

    const user = {
      name,
      email,
      password: await hash(password, 8)
    }

    const userId = await User.insertNew({ user })

    return res.json(userId)
  }

  async update(req, res) {
    const user_id = req.user.id
    const { name, email, new_password, user } = req.body

    user.password = await hash(new_password, 8)

    user.name = name
    user.email = email

    await User.update({ id: user_id, user })

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params

    await User.delete({ id })

    return res.json()
  }
}

module.exports = UsersController
