const { Income } = require('../models/Income')
const AppError = require('../utils/AppError')

module.exports = {
  async post(req, res, next) {
    const user_id = req.user.id
    const { title, observation, value, date, account_id, income_category_id } =
      req.body

    if (!title) {
      throw new AppError('Informe o título da receita')
    }

    if (!value) {
      throw new AppError('Informe o valor da receita')
    }

    if (!date) {
      throw new AppError('Informe a data da receita')
    }

    if (!account_id) {
      throw new AppError('Selecione a conta')
    }

    if (!income_category_id) {
      throw new AppError('Selecione a categoria da receita')
    }

    next()
  },

  async put(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params
    const { title, observation, value, date, account_id, income_category_id } =
      req.body

    if (!id) {
      throw new AppError('Informe a receita a ser atualizada')
    }

    const income = await Income.getById({ id, user_id })

    if (!income) {
      throw new AppError('Receita não encontrada')
    } else {
      req.body.income = income
    }

    if (!title) {
      throw new AppError('Informe o título da receita')
    }

    if (!value) {
      throw new AppError('Informe o valor da receita')
    }

    if (!date) {
      throw new AppError('Informe a data da receita')
    }

    if (!account_id) {
      throw new AppError('Selecione a conta')
    }

    if (!income_category_id) {
      throw new AppError('Selecione a categoria da receita')
    }

    next()
  },

  async delete(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params

    const income = await Income.getById({ id, user_id })

    if (!income) {
      throw new AppError('Receita não encontrada')
    } else {
      req.body.income = income
    }

    next()
  }
}
