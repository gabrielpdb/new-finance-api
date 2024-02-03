const knex = require('../../knexfile')

const table = 'yield_balance_change'

const YieldBalanceChange = {
  async getLastByAccountId({ account_id, user_id }) {
    try {
      const transaction = await knex(table)
        .where({ account_id, user_id })
        .orderBy('date', 'desc')
        .first()

      return transaction
    } catch (error) {
      console.error(error)
    }
  },

  async insertNew({
    transaction = {
      value: 0,
      percent: 0,
      days: 0,
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

module.exports = { YieldBalanceChange }
