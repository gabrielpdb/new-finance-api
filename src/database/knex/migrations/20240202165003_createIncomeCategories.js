const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('income_categories', table => {
      table.increments('id')
      table.text('title')
      table.text('color')

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('income_categories')))

exports.down = knex => knex.schema.dropTable('income_categories')
