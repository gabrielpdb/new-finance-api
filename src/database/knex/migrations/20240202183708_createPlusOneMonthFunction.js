const ON_INSERT_PLUS_ONE_MONTH_FUNCTION = `
CREATE OR REPLACE FUNCTION plus_one_month()
RETURNS TRIGGER AS $$
BEGIN
  NEW.expiration_date = NEW.date + INTERVAL '1 month';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`
const DROP_ON_INSERT_PLUS_ONE_MONTH_FUNCTION = `DROP FUNCTION plus_one_month`

exports.up = knex => knex.raw(ON_INSERT_PLUS_ONE_MONTH_FUNCTION)
exports.down = knex => knex.raw(DROP_ON_INSERT_PLUS_ONE_MONTH_FUNCTION)
