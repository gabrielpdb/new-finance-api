const knex = require('../database/knex')

const table = 'transfers'

const Transfer = {
  async getAll({ user_id }) {
    try {
      const transfers = await knex(table).where({ user_id })

      return transfers
    } catch (error) {
      console.error(error)
    }
  },

  async getById({ id, user_id }) {
    try {
      const transfer = await knex(table).where({ id, user_id }).first()

      return transfer
    } catch (error) {
      console.error(error)
    }
  },

  async getAllByOriginAccountId({ account_id, user_id }) {
    try {
      const transfers = await knex(table).where({
        origin_account_id: account_id,
        user_id
      })

      return transfers
    } catch (error) {
      console.error(error)
    }
  },

  async getAllByDestinyAccountId({ account_id, user_id }) {
    try {
      const transfers = await knex(table).where({
        destiny_account_id: account_id,
        user_id
      })

      return transfers
    } catch (error) {
      console.error(error)
    }
  },

  async insertNew({
    transfer = {
      observation: '',
      value: 0,
      date: '',
      origin_account_id: 0,
      destiny_account_id: 0,
      user_id: 0
    }
  }) {
    transfer.date = new Date(transfer.date)
    const now = new Date()

    if (transfer.date > now) {
      transfer.is_valid = false
    } else {
      transfer.is_valid = true
    }

    try {
      const [id] = await knex(table).insert(transfer).returning('id')

      return { id, is_valid: transfer.is_valid }
    } catch (error) {
      console.error(error)
    }
  },

  async update({
    id,
    transfer = {
      observation: '',
      value: 0,
      date: '',
      origin_account_id: 0,
      destiny_account_id: 0
    },
    user_id
  }) {
    try {
      transfer.date = new Date(transfer.date)
      const now = new Date()

      if (transfer.date > now) {
        transfer.is_valid = false
      } else {
        transfer.is_valid = true
      }

      await knex(table).update(transfer).where({ id, user_id })

      return { is_valid: transfer.is_valid }
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

module.exports = { Transfer }
