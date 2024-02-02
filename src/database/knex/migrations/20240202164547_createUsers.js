const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('users', table => {
      table.increments('id')
      table.text('name')
      table.text('email')
      table.text('password')
      table.text('avatar')
      table.boolean('is_admin')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('users')))

exports.down = knex => knex.schema.dropTable('users')
