const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const { User } = require('../models/User')

class UsersController {
  async create(req, res) {
    return res.json('post')
  }
}

module.exports = UsersController
