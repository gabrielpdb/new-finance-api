const { Expense } = require('../models/Expense')
const AppError = require('../utils/AppError')

module.exports = {
  async post(req, res, next) {
    const user_id = req.user.id
    const { title, observation, value, date, account_id, expense_category_id } =
      req.body

    if (!title) {
      throw new AppError('Informe o título da despesa')
    }

    if (!value) {
      throw new AppError('Informe o valor da despesa')
    }

    if (!date) {
      throw new AppError('Informe a data da despesa')
    }

    if (!account_id) {
      throw new AppError('Selecione a conta')
    }

    if (!expense_category_id) {
      throw new AppError('Selecione a categoria da despesa')
    }

    next()
  },

  async put(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params
    const { title, observation, value, date, account_id, expense_category_id } =
      req.body

    if (!id) {
      throw new AppError('Informe a despesa a ser atualizada')
    }

    const expense = await Expense.getById({ id, user_id })

    if (!expense) {
      throw new AppError('Despesa não encontrada')
    } else {
      req.body.expense = expense
    }

    if (!title) {
      throw new AppError('Informe o título da despesa')
    }

    if (!value) {
      throw new AppError('Informe o valor da despesa')
    }

    if (!date) {
      throw new AppError('Informe a data da despesa')
    }

    if (!account_id) {
      throw new AppError('Selecione a conta')
    }

    if (!expense_category_id) {
      throw new AppError('Selecione a categoria da despesa')
    }

    next()
  },

  async delete(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params

    const expense = await Expense.getById({ id, user_id })

    if (!expense) {
      throw new AppError('Despesa não encontrada')
    } else {
      req.body.expense = expense
    }

    next()
  }
}
