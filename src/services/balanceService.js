const { Account } = require('../models/Account')
const { User } = require('../models/User')
const { Income } = require('../models/Income')
const { Expense } = require('../models/Expense')
const { Transfer } = require('../models/Transfer')
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
    new_balance = Number(new_balance)
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
    new_balance = Number(new_balance)
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
  },

  async increaseBalance({ account_id, value, user_id }) {
    value = Number(value)
    const account = await Account.getById({ id: account_id, user_id })

    if (!account) {
      throw new AppError('Conta não encontrada')
    }

    account.current_balance = Number(account.current_balance) + value

    await Account.update({ id: account_id, user_id, account })

    return
  },

  async decreaseBalance({ account_id, value, user_id }) {
    value = Number(value)
    const account = await Account.getById({ id: account_id, user_id })

    if (!account) {
      throw new AppError('Conta não encontrada')
    }

    account.current_balance = Number(account.current_balance) - value

    await Account.update({ id: account_id, user_id, account })

    return
  },

  async checkAllAccountsBalance() {
    let errors = []
    const users = await User.getAll()

    for (const user of users) {
      const accounts = await Account.getAll({ user_id: user.id })

      for (const account of accounts) {
        let balance = Number(account.initial_balance)

        const incomes = await Income.getAllByAccountId({
          user_id: user.id,
          account_id: account.id
        })

        incomes.forEach(transaction => {
          balance += Number(transaction.value)
        })

        const expenses = await Expense.getAllByAccountId({
          user_id: user.id,
          account_id: account.id
        })

        expenses.forEach(transaction => {
          balance -= Number(transaction.value)
        })

        const income_transfers = await Transfer.getAllByDestinyAccountId({
          user_id: user.id,
          account_id: account.id
        })

        income_transfers.forEach(transaction => {
          balance += Number(transaction.value)
        })

        const expense_transfers = await Transfer.getAllByOriginAccountId({
          user_id: user.id,
          account_id: account.id
        })

        expense_transfers.forEach(transaction => {
          balance -= Number(transaction.value)
        })

        if (balance != Number(account.current_balance)) {
          const error = `Erro de saldo na conta ${
            account.id
          }. O saldo deveria ser ${balance}, mas é ${Number(
            account.current_balance
          )}. Verifique!`

          errors.push({
            error,
            difference: balance - Number(account.current_balance)
          })
        }
      }
    }

    return errors
  }
}

module.exports = { balanceService }
