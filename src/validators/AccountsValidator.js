const { Account } = require('../models/Account')
const AppError = require('../utils/AppError')

module.exports = {
  async post(req, res, next) {
    const user_id = req.user.id
    const { title, initial_balance, color, has_yield, account_type_id } =
      req.body

    if (!title) {
      throw new AppError('Informe o título da conta')
    }

    const accountTitleAlreadyInUse = await Account.getByTitle({
      user_id,
      title
    })

    if (accountTitleAlreadyInUse) {
      throw new AppError('Você já possui uma conta com esse título')
    }

    if (!initial_balance) {
      throw new AppError('Informe o saldo inicial da conta')
    }

    if (!color) {
      throw new AppError('Informe uma cor para a conta')
    }

    const accountColorAlreadyInUse = await Account.getByColor({
      user_id,
      color
    })

    if (accountColorAlreadyInUse) {
      throw new AppError('Você já possui uma conta com essa mesma cor')
    }

    if (!account_type_id) {
      throw new AppError('Escolha um tipo de conta')
    }

    next()
  },

  async put(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params
    const { title, current_balance, color, has_yield, account_type_id } =
      req.body

    if (!id) {
      throw new AppError('Informe a conta a ser atualizada')
    }

    const account = await Account.getById({ id, user_id })

    if (!account) {
      throw new AppError('Conta não encontrada')
    } else {
      req.body.account = account
    }

    if (!title) {
      throw new AppError('Informe o título da conta')
    }

    const accountTitleAlreadyInUse = await Account.getByTitle({
      user_id,
      title
    })

    if (accountTitleAlreadyInUse && accountTitleAlreadyInUse.id != id) {
      throw new AppError('Você já possui uma conta com esse título')
    }

    if (!current_balance) {
      throw new AppError('Informe o saldo atual da conta')
    }

    if (!color) {
      throw new AppError('Informe uma cor para a conta')
    }

    const accountColorAlreadyInUse = await Account.getByColor({
      user_id,
      color
    })

    if (accountColorAlreadyInUse && accountColorAlreadyInUse.id != id) {
      throw new AppError('Você já possui uma conta com essa mesma cor')
    }

    if (!account_type_id) {
      throw new AppError('Escolha um tipo de conta')
    }

    next()
  },

  async delete(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params

    const account = await Account.getById({ id, user_id })

    if (!account) {
      throw new AppError('Conta não encontrada', 404)
    }

    next()
  }
}
