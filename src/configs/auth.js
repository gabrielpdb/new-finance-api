require('dotenv').config()
const { JWT_SECRET, JWT_EXPIRES } = process.env

module.exports = {
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES
  }
}
