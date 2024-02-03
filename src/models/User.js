const knex = require('../database/knex')

const table = 'users'

const User = {
  async getById({ id }) {
    try {
      const user = await knex(table).where({ id }).first()

      return user
    } catch (error) {
      console.error(error)
    }
  },

  async getByEmail({ email }) {
    try {
      const user = await knex(table).where({ email }).first()

      return user
    } catch (error) {
      console.error(error)
    }
  },

  async insertNew({ user = { name: '', email: '', password: '' } }) {
    try {
      const [userId] = await knex(table).insert(user).returning('id')

      return userId
    } catch (error) {
      console.error(error)
    }
  },

  async update({ id, user = { name: '', email: '', password: '' } }) {
    try {
      await knex(table).update(user).where({ id })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = { User }
