const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('transfers', table => {
      table.increments('id')
      table.text('observation')
      table.decimal('value', 14, 2)
      table.timestamp('date')
      table.boolean('is_valid').default(true)

      table
        .integer('origin_account_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table
        .integer('destiny_account_id')
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
    .then(() => knex.raw(onUpdateTrigger('transfers')))

exports.down = knex => knex.schema.dropTable('transfers')
