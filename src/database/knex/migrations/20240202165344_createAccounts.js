const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('accounts', table => {
      table.increments('id')
      table.text('title')
      table.decimal('initial_balance', 14, 2)
      table.decimal('current_balance', 14, 2)
      table.text('color')
      table.boolean('has_yield').default(false)

      table
        .integer('account_type_id')
        .references('id')
        .inTable('account_types')
        .onDelete('CASCADE')

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('accounts')))

exports.down = knex => knex.schema.dropTable('accounts')
