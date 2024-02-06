const AppError = require('../utils/AppError')
const { balanceService } = require('../services/balanceService')
const { Transfer } = require('../models/Transfer')

class TransfersController {
  async index(req, res) {
    const user_id = req.user.id

    const transfers = await Transfer.getAll({ user_id })

    if (transfers.length == 0) {
      throw new AppError('Nenhuma transferência encontrada', 404)
    }

    return res.json(transfers)
  }

  async show(req, res) {
    const user_id = req.user.id
    const { id } = req.params

    const transfer = await Transfer.getById({ id, user_id })

    if (!transfer) {
      throw new AppError('Transferência não encontrada', 404)
    }

    return res.json(transfer)
  }

  async create(req, res) {
    const user_id = req.user.id
    const { observation, value, date, origin_account_id, destiny_account_id } =
      req.body

    const { id, is_valid } = await Transfer.insertNew({
      transfer: {
        date,
        destiny_account_id,
        observation,
        origin_account_id,
        user_id,
        value
      }
    })

    if (is_valid) {
      await balanceService.decreaseBalance({
        account_id: origin_account_id,
        user_id,
        value
      })
      await balanceService.increaseBalance({
        account_id: destiny_account_id,
        user_id,
        value
      })
    }

    return res.json(id)
  }

  async update(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const {
      observation,
      value,
      date,
      origin_account_id,
      destiny_account_id,
      transfer
    } = req.body

    if (transfer.is_valid) {
      await balanceService.decreaseBalance({
        account_id: transfer.destiny_account_id,
        user_id,
        value
      })
      await balanceService.increaseBalance({
        account_id: transfer.origin_account_id,
        user_id,
        value
      })
    }

    const { is_valid } = await Transfer.update({
      id,
      user_id,
      transfer: {
        date,
        destiny_account_id,
        observation,
        origin_account_id,
        value
      }
    })

    if (is_valid) {
      await balanceService.decreaseBalance({
        account_id: origin_account_id,
        user_id,
        value
      })
      await balanceService.increaseBalance({
        account_id: destiny_account_id,
        user_id,
        value
      })
    }

    return res.json()
  }

  async delete(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const { transfer } = req.body

    if (transfer.is_valid) {
      await balanceService.decreaseBalance({
        account_id: transfer.destiny_account_id,
        user_id,
        value: transfer.value
      })
      await balanceService.increaseBalance({
        account_id: transfer.origin_account_id,
        user_id,
        value: transfer.value
      })
    }

    await Transfer.delete({ id, user_id })

    return res.json()
  }
}

module.exports = TransfersController
