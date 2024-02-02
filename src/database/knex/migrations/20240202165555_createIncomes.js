const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('incomes', table => {
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
        .integer('income_category_id')
        .references('id')
        .inTable('income_categories')
        .onDelete('CASCADE')

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('incomes')))

exports.down = knex => knex.schema.dropTable('incomes')
