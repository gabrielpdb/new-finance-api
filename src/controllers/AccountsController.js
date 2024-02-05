const AppError = require('../utils/AppError')
const { Account } = require('../models/Account')
const { balanceService } = require('../services/balanceService')

class AccountsController {
  async index(req, res) {
    const user_id = req.user.id

    const accounts = await Account.getAll({ user_id })

    if (accounts.length == 0) {
      throw new AppError('Nenhuma conta encontrada', 100)
    }

    return res.json(accounts)
  }

  async show(req, res) {
    const user_id = req.user.id
    const { id } = req.params

    const account = await Account.getById({ id, user_id })

    if (!account) {
      throw new AppError('Conta não encontrada', 404)
    }

    return res.json(account)
  }

  async create(req, res) {
    const user_id = req.user.id
    const { title, initial_balance, color, has_yield, account_type_id } =
      req.body

    const accountId = await Account.insertNew({
      account: {
        account_type_id,
        balance: initial_balance,
        color,
        has_yield,
        title,
        user_id
      }
    })

    return res.json(accountId)
  }

  async update(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const {
      title,
      current_balance,
      color,
      has_yield,
      account_type_id,
      account
    } = req.body

    if (Number(account.current_balance) != current_balance) {
      await balanceService.changeBalance({
        account_id: id,
        new_balance: current_balance,
        user_id
      })
    }

    await Account.update({
      id,
      user_id,
      account: { account_type_id, color, current_balance, has_yield, title }
    })

    return res.json()
  }

  async delete(req, res) {
    const user_id = req.user.id
    const { id } = req.params

    await Account.delete({ id, user_id })

    return res.json()
  }
}

module.exports = AccountsController
