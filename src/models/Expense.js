const knex = require('../database/knex')

const table = 'expenses'

const Expense = {
  async getAll({ user_id }) {
    try {
      const expenses = await knex(table).where({ user_id })

      return expenses
    } catch (error) {
      console.error(error)
    }
  },

  async getById({ id, user_id }) {
    try {
      const expense = await knex(table).where({ id, user_id }).first()

      return expense
    } catch (error) {
      console.error(error)
    }
  },

  async getByTitle({ title, user_id }) {
    try {
      const expense = await knex(table).where({ user_id, title }).first()

      return expense
    } catch (error) {
      console.error(error)
    }
  },

  async insertNew({
    expense = {
      title: '',
      observation: '',
      value: 0,
      date: '',
      account_id: 0,
      expense_category_id: 0,
      user_id: 0
    }
  }) {
    expense.date = new Date(expense.date)
    const now = new Date()

    if (expense.date > now) {
      expense.is_valid = false
    } else {
      expense.is_valid = true
    }

    try {
      const [id] = await knex(table).insert(expense).returning('id')

      return { id, is_valid: expense.is_valid }
    } catch (error) {
      console.error(error)
    }
  },

  async update({
    id,
    expense = {
      title: '',
      observation: '',
      value: 0,
      date: '',
      account_id: 0,
      expense_category_id: 0
    },
    user_id
  }) {
    try {
      expense.date = new Date(expense.date)
      const now = new Date()

      if (expense.date > now) {
        expense.is_valid = false
      } else {
        expense.is_valid = true
      }

      await knex(table).update(expense).where({ id, user_id })

      return { is_valid: expense.is_valid }
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

module.exports = { Expense }
