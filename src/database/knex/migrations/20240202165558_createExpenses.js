const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('expenses', table => {
      table.increments('id')
      table.text('title')
      table.text('observation')
      table.decimal('value', 14, 2)
      table.timestamp('date')
      table.boolean('is_valid').default(true)

      table
        .integer('account_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table
        .integer('expense_category_id')
        .references('id')
        .inTable('expense_categories')
        .onDelete('CASCADE')

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('expenses')))

exports.down = knex => knex.schema.dropTable('expenses')
