const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('account_types', table => {
      table.increments('id')
      table.text('title')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('account_types')))

exports.down = knex => knex.schema.dropTable('account_types')
