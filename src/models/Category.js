const knex = require('../database/knex')

const Category = {
  async getAll({ user_id, type }) {
    try {
      const accounts = await knex(`${type}_categories`).where({ user_id })

      return accounts
    } catch (error) {
      console.error(error)
    }
  },

  async getById({ id, user_id, type }) {
    try {
      const account = await knex(`${type}_categories`)
        .where({ id, user_id })
        .first()

      return account
    } catch (error) {
      console.error(error)
    }
  },

  async getByTitle({ title, user_id, type }) {
    try {
      const account = await knex(`${type}_categories`)
        .where({ user_id, title })
        .first()

      return account
    } catch (error) {
      console.error(error)
    }
  },

  async getByColor({ color, user_id, type }) {
    try {
      const account = await knex(`${type}_categories`)
        .where({ user_id, color })
        .first()

      return account
    } catch (error) {
      console.error(error)
    }
  },

  async insertNew({
    category = {
      title: '',
      color: '',
      user_id: 0
    },
    type
  }) {
    try {
      const [id] = await knex(`${type}_categories`)
        .insert(category)
        .returning('id')

      return id
    } catch (error) {
      console.error(error)
    }
  },

  async update({
    id,
    category = {
      title: '',
      color: ''
    },
    user_id,
    type
  }) {
    try {
      await knex(`${type}_categories`).update(category).where({ id, user_id })

      return
    } catch (error) {
      console.error(error)
    }
  },

  async delete({ id, user_id, type }) {
    try {
      await knex(`${type}_categories`).delete().where({ id, user_id })

      return
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = { Category }
