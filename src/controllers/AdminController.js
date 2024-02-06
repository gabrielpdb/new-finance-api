const AppError = require('../utils/AppError')
const { balanceService } = require('../services/balanceService')

class AdminController {
  async checkAllAccountsBalance(req, res) {
    let errors = await balanceService.checkAllAccountsBalance()

    if (errors.length == 0) {
      errors = 'OK'
    }

    return res.json(errors)
  }
}

module.exports = AdminController
