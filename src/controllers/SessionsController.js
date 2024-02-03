const { sign } = require('jsonwebtoken')
const authConfig = require('../configs/auth')
const { User } = require('../models/User')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await User.getByEmail({ email })

    if (!user) {
      throw new AppError('Email e/ou senha incorretos', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email e/ou senha incorretos', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, { subject: String(user.id), expiresIn })

    return res.json({ user, token })
  }
}

module.exports = SessionsController
