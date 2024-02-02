const { onUpdateTrigger } = require('../../../../knexfile')

exports.up = knex =>
  knex.schema
    .createTable('notifications', table => {
      table.increments('id')
      table.text('title').default('Notificação')
      table.text('description')
      table.timestamp('date')
      table.timestamp('expiration_date')

      table.boolean('read').default(false)

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .then(() =>
      knex.raw(`
    CREATE TRIGGER plus_one_month_trigger
    BEFORE INSERT ON notifications
    FOR EACH ROW
    EXECUTE PROCEDURE plus_one_month()
    `)
    )
    .then(() => knex.raw(onUpdateTrigger('notifications')))
    .then(() =>
      knex.raw(`
      CREATE TRIGGER delete_expired_notifications_trigger
      AFTER INSERT ON notifications
      FOR EACH ROW
      EXECUTE PROCEDURE delete_expired_notifications();
    `)
    )

exports.down = knex => knex.schema.dropTable('notifications')
