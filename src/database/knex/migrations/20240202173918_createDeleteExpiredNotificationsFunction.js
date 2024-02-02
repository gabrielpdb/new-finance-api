const ON_MODIFY_NOTIFICATIONS_TABLE_FUNCTION = `
CREATE OR REPLACE FUNCTION delete_expired_notifications()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM notifications WHERE expiration_date IS NOT NULL AND expiration_date <= NOW();
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
`
const DROP_ON_MODIFY_NOTIFICATIONS_TABLE_FUNCTION = `DROP FUNCTION delete_expired_notifications`

exports.up = knex => knex.raw(ON_MODIFY_NOTIFICATIONS_TABLE_FUNCTION)
exports.down = knex => knex.raw(DROP_ON_MODIFY_NOTIFICATIONS_TABLE_FUNCTION)
