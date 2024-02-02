const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('balance_change', table => {
      table.increments('id')
      table.decimal('old_balance', 14, 2)
      table.decimal('new_balance', 14, 2)
      table.timestamp('date')

      table
        .integer('account_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('balance_change')))

exports.down = knex => knex.schema.dropTable('balance_change')
