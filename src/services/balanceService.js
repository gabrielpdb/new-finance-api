const { Account } = require('../models/Account')
const { BalanceChange } = require('../models/BalanceChange')
const { YieldBalanceChange } = require('../models/YieldBalanceChange')
const AppError = require('../utils/AppError')

const balanceService = {
  async getAccountBalance({ account_id, user_id }) {
    const balance = await Account.getAccountBalanceById({
      id: account_id,
      user_id
    })

    return balance
  },

  async changeBalance({ account_id, new_balance, user_id }) {
    const account = await Account.getById({ id: account_id, user_id })

    if (!account) {
      throw new AppError('Conta não encontrada')
    }

    await BalanceChange.insertNew({
      transaction: {
        account_id,
        date: new Date(),
        new_balance,
        old_balance: account.current_balance,
        user_id: account.user_id
      }
    })

    account.current_balance = new_balance

    await Account.update({ id: account_id, account })

    return
  },

  async yieldChangeBalance({ account_id, new_balance, user_id }) {
    const account = await Account.getById({ id: account_id, user_id })

    if (!account) {
      throw new AppError('Conta não encontrada')
    }

    const value = Number(account.current_balance) - new_balance
    const percent = (value * 100) / Number(account.current_balance)
    let days = 0

    const lastYieldBalanceChange = await YieldBalanceChange.getLastByAccountId({
      account_id,
      user_id
    })

    let date = new Date()

    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)

    if (lastYieldBalanceChange) {
      days = (date - lastYieldBalanceChange.date) / (1000 * 60 * 60 * 24)
      days = Math.round(days)
    }

    await YieldBalanceChange.insertNew({
      transaction: {
        account_id,
        user_id,
        value,
        percent,
        days
      }
    })

    account.current_balance = new_balance

    await Account.update({ id: account_id, account, user_id })

    return
  }
}

module.exports = { balanceService }
