const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const { User } = require('../models/User')

class UsersController {
  async index(req, res) {
    try {
      const users = await User.getAll()

      if (users.lenght == 0) {
        throw new AppError('Nenhum usuário encontrado', 100)
      }

      return res.json(users)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }

  async show(req, res) {
    try {
      const user_id = req.user.id

      const user = await User.getById({ id: user_id })

      if (!user) {
        throw new AppError('Usuário não encontrado', 404)
      }

      return res.json(user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }

  async create(req, res) {
    try {
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

  async update(req, res) {
    try {
      const user_id = req.user.id
      const { name, email, old_password, new_password } = req.body

      const user = await User.getById({ id: user_id })

      if (!user) {
        throw new AppError('Usuário não encontrado', 404)
      }

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

        user.password = await hash(new_password, 8)
      }

      user.name = name
      user.email = email

      await User.update({ id: user_id, user })

      return res.json()
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      const user = await User.getById({ id })

      if (!user) {
        throw new AppError('Usuário não encontrado', 404)
      }

      await User.delete({ id })

      return res.json()
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
