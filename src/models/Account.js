const knex = require('../database/knex')

const table = 'accounts'

const Account = {
  async getAll({ user_id }) {
    try {
      const accounts = await knex(table).where({ user_id })

      return accounts
    } catch (error) {
      console.error(error)
    }
  },

  async getById({ id, user_id }) {
    try {
      const account = await knex(table).where({ id, user_id }).first()

      return account
    } catch (error) {
      console.error(error)
    }
  },

  async getByTitle({ title, user_id }) {
    try {
      const account = await knex(table).where({ user_id, title }).first()

      return account
    } catch (error) {
      console.error(error)
    }
  },

  async getByColor({ color, user_id }) {
    try {
      const account = await knex(table).where({ user_id, color }).first()

      return account
    } catch (error) {
      console.error(error)
    }
  },

  async getAccountBalanceById({ id, user_id }) {
    try {
      const balance = await knex(table)
        .select('current_balance')
        .where({ id, user_id })
        .first()

      return balance
    } catch (error) {
      console.error(error)
    }
  },

  async insertNew({
    account = {
      title: '',
      balance: 0,
      color: '',
      has_yield: false,
      account_type_id: 0,
      user_id: 0
    }
  }) {
    try {
      account.initial_balance = account.balance
      account.current_balance = account.balance
      delete account.balance

      const [accountId] = await knex(table).insert(account).returning('id')

      return accountId
    } catch (error) {
      console.error(error)
    }
  },

  async update({
    id,
    account = {
      title: '',
      current_balance: 0,
      color: '',
      has_yield: false,
      account_type_id: 0
    },
    user_id
  }) {
    try {
      await knex(table).update(account).where({ id, user_id })

      return
    } catch (error) {
      console.error(error)
    }
  },

  async delete({ id, user_id }) {
    try {
      await knex(table).delete().where({ id, user_id })

      return
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = { Account }
