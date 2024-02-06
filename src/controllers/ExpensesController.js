const AppError = require('../utils/AppError')
const { balanceService } = require('../services/balanceService')
const { Expense } = require('../models/Expense')

class ExpensesController {
  async index(req, res) {
    const user_id = req.user.id

    const expenses = await Expense.getAll({ user_id })

    if (expenses.length == 0) {
      throw new AppError('Nenhuma despesa encontrada', 404)
    }

    return res.json(expenses)
  }

  async show(req, res) {
    const user_id = req.user.id
    const { id } = req.params

    const expense = await Expense.getById({ id, user_id })

    if (!expense) {
      throw new AppError('Despesa não encontrada', 404)
    }

    return res.json(expense)
  }

  async create(req, res) {
    const user_id = req.user.id
    const { title, observation, value, date, account_id, expense_category_id } =
      req.body

    const { id, is_valid } = await Expense.insertNew({
      expense: {
        account_id,
        date,
        expense_category_id,
        observation,
        title,
        user_id,
        value
      }
    })

    if (is_valid) {
      await balanceService.decreaseBalance({ account_id, user_id, value })
    }

    return res.json(id)
  }

  async update(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const {
      title,
      observation,
      value,
      date,
      account_id,
      expense_category_id,
      expense
    } = req.body

    if (expense.is_valid) {
      await balanceService.increaseBalance({
        account_id: expense.account_id,
        user_id,
        value: expense.value
      })
    }

    const { is_valid } = await Expense.update({
      id,
      user_id,
      expense: {
        account_id,
        date,
        expense_category_id,
        observation,
        title,
        value
      }
    })

    if (is_valid) {
      await balanceService.decreaseBalance({ account_id, user_id, value })
    }

    return res.json()
  }

  async delete(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const { expense } = req.body

    if (expense.is_valid) {
      await balanceService.increaseBalance({
        account_id: expense.account_id,
        user_id,
        value: expense.value
      })
    }

    await Expense.delete({ id, user_id })

    return res.json()
  }
}

module.exports = ExpensesController
