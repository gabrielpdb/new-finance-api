const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('notifications', table => {
      table.increments('id')
      table.text('title').default('Notificação')
      table.text('description')
      table.timestamp('date')
      table
        .timestamp('expiration_date')
        .defaultTo(knex.raw("(CURRENT_TIMESTAMP + INTERVAL '1 month')"))
      table.boolean('read').default(false)

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('notifications')))
    .then(() =>
      knex.raw(`
      CREATE TRIGGER delete_expired_notifications_trigger
      BEFORE INSERT OR UPDATE OR DELETE ON notifications
      FOR EACH STATEMENT
      EXECUTE FUNCTION delete_expired_notifications();
    `)
    )

exports.down = knex => knex.schema.dropTable('notifications')
