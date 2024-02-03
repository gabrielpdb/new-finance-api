const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const { User } = require('../models/User')

class UsersController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body

      if (!name) {
        throw new AppError('Informe o seu nome!')
      }

      if (!password) {
        throw new AppError('Informe uma senha!')
      }

      if (!email) {
        throw new AppError('Informe um email!')
      }

      const emailAlreadyInUse = await User.getByEmail({ email })

      if (emailAlreadyInUse) {
        throw new AppError('Email já está em uso!')
      }

      const user = {
        name,
        email,
        password: await hash(password, 8)
      }

      const userId = await User.insertNew({ user })

      return res.json(userId)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }
}

module.exports = UsersController
