const config = require('../../../knexfile')
require('dotenv').config()
const { DATABASE_MODE } = process.env

const knex = require('knex')

let connection

if (DATABASE_MODE == 'local') {
  connection = knex(config.development)
} else if (DATABASE_MODE == 'production') {
  connection = knex(config.production)
}

module.exports = connection
