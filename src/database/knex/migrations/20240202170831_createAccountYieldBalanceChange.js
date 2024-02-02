const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('yield_balance_change', table => {
      table.increments('id')
      table.decimal('value', 14, 2)
      table.decimal('percent', 14, 2)
      table.integer('days').default(null)
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
    .then(() => knex.raw(onUpdateTrigger('yield_balance_change')))

exports.down = knex => knex.schema.dropTable('yield_balance_change')
