const { Transfer } = require('../models/Transfer')
const AppError = require('../utils/AppError')

module.exports = {
  async post(req, res, next) {
    const user_id = req.user.id
    const { observation, value, date, origin_account_id, destiny_account_id } =
      req.body

    if (!value) {
      throw new AppError('Informe o valor da transferência')
    }

    if (!date) {
      throw new AppError('Informe a data da transferência')
    }

    if (!origin_account_id) {
      throw new AppError('Selecione a conta de origem')
    }

    if (!destiny_account_id) {
      throw new AppError('Selecione a conta de destino')
    }

    next()
  },

  async put(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params
    const { observation, value, date, origin_account_id, destiny_account_id } =
      req.body

    if (!id) {
      throw new AppError('Informe a transferência a ser atualizada')
    }

    const transfer = await Transfer.getById({ id, user_id })

    if (!transfer) {
      throw new AppError('Transferência não encontrada')
    } else {
      req.body.transfer = transfer
    }

    if (!value) {
      throw new AppError('Informe o valor da transferência')
    }

    if (!date) {
      throw new AppError('Informe a data da transferência')
    }

    if (!origin_account_id) {
      throw new AppError('Selecione a conta de origem')
    }

    if (!destiny_account_id) {
      throw new AppError('Selecione a conta de destino')
    }

    next()
  },

  async delete(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params

    const transfer = await Transfer.getById({ id, user_id })

    if (!transfer) {
      throw new AppError('Transferência não encontrada')
    } else {
      req.body.transfer = transfer
    }

    next()
  }
}
