const knex = require('../database/knex')

const table = 'users'

const User = {
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
  }
}

module.exports = { User }
