const knex = require('../database/knex')

const table = 'incomes'

const Income = {
  async getAll({ user_id }) {
    try {
      const incomes = await knex(table).where({ user_id })

      return incomes
    } catch (error) {
      console.error(error)
    }
  },

  async getById({ id, user_id }) {
    try {
      const income = await knex(table).where({ id, user_id }).first()

      return income
    } catch (error) {
      console.error(error)
    }
  },

  async getByTitle({ title, user_id }) {
    try {
      const income = await knex(table).where({ user_id, title }).first()

      return income
    } catch (error) {
      console.error(error)
    }
  },

  async getAllByCategoryId({ category_id, user_id }) {
    try {
      const incomes = await knex(table).where({
        user_id,
        income_category_id: category_id
      })

      return incomes
    } catch (error) {
      console.error(error)
    }
  },

  async insertNew({
    income = {
      title: '',
      observation: '',
      value: 0,
      date: '',
      account_id: 0,
      income_category_id: 0,
      user_id: 0
    }
  }) {
    income.date = new Date(income.date)
    const now = new Date()

    if (income.date > now) {
      income.is_valid = false
    } else {
      income.is_valid = true
    }

    try {
      const [id] = await knex(table).insert(income).returning('id')

      return { id, is_valid: income.is_valid }
    } catch (error) {
      console.error(error)
    }
  },

  async update({
    id,
    income = {
      title: '',
      observation: '',
      value: 0,
      date: '',
      account_id: 0,
      income_category_id: 0
    },
    user_id
  }) {
    try {
      income.date = new Date(income.date)
      const now = new Date()

      if (income.date > now) {
        income.is_valid = false
      } else {
        income.is_valid = true
      }

      await knex(table).update(income).where({ id, user_id })

      return { is_valid: income.is_valid }
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

module.exports = { Income }
