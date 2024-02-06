const AppError = require('../utils/AppError')
const { balanceService } = require('../services/balanceService')
const { Income } = require('../models/Income')

class IncomesController {
  async index(req, res) {
    const user_id = req.user.id

    const incomes = await Income.getAll({ user_id })

    if (incomes.length == 0) {
      throw new AppError('Nenhuma receita encontrada', 404)
    }

    return res.json(incomes)
  }

  async show(req, res) {
    const user_id = req.user.id
    const { id } = req.params

    const income = await Income.getById({ id, user_id })

    if (!income) {
      throw new AppError('Receita não encontrada', 404)
    }

    return res.json(income)
  }

  async create(req, res) {
    const user_id = req.user.id
    const { title, observation, value, date, account_id, income_category_id } =
      req.body

    const { id, is_valid } = await Income.insertNew({
      income: {
        account_id,
        date,
        income_category_id,
        observation,
        title,
        user_id,
        value
      }
    })

    if (is_valid) {
      await balanceService.increaseBalance({ account_id, user_id, value })
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
      income_category_id,
      income
    } = req.body

    if (income.is_valid) {
      await balanceService.decreaseBalance({
        account_id: income.account_id,
        user_id,
        value: income.value
      })
    }

    const { is_valid } = await Income.update({
      id,
      user_id,
      income: {
        account_id,
        date,
        income_category_id,
        observation,
        title,
        value
      }
    })

    if (is_valid) {
      await balanceService.increaseBalance({ account_id, user_id, value })
    }

    return res.json()
  }

  async delete(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const { income } = req.body

    if (income.is_valid) {
      await balanceService.decreaseBalance({
        account_id: income.account_id,
        user_id,
        value: income.value
      })
    }

    await Income.delete({ id, user_id })

    return res.json()
  }
}

module.exports = IncomesController
