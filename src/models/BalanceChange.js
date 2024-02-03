const knex = require('../database/knex')

const table = 'balance_change'

const BalanceChange = {
  async insertNew({
    transaction = {
      old_balance: 0,
      new_balance: 0,
      date: '',
      account_id: 0,
      user_id
    }
  }) {
    try {
      const [id] = await knex(table).insert(transaction).returning('id')

      return id
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = { BalanceChange }
