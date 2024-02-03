const AppError = require('../utils/AppError')
const { Account } = require('../models/Account')
const { balanceService } = require('../services/balanceService')

class AccountsController {
  async index(req, res) {
    try {
      const user_id = req.user.id

      const accounts = await Account.getAll({ user_id })

      if (accounts.lenght == 0) {
        throw new AppError('Nenhuma conta encontrada', 100)
      }

      return res.json(accounts)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }

  async show(req, res) {
    try {
      const user_id = req.user.id
      const { id } = req.params

      const account = await Account.getById({ id, user_id })

      if (!account) {
        throw new AppError('Conta não encontrada', 404)
      }

      return res.json(account)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }

  async create(req, res) {
    try {
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

      const accountId = await Account.insertNew({
        account: {
          account_type_id,
          balance: initial_balance,
          color,
          has_yield,
          title,
          user_id
        }
      })

      return res.json(accountId)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }

  async update(req, res) {
    try {
      const user_id = req.user.id
      const { id } = req.params
      const { title, current_balance, color, has_yield, account_type_id } =
        req.body

      const account = await Account.getById({ id, user_id })

      if (!account) {
        throw new AppError('Conta não encontrada')
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

      if (Number(account.current_balance) != current_balance) {
        await balanceService.changeBalance({
          account_id: id,
          new_balance: current_balance,
          user_id
        })
      }

      await Account.update({
        id,
        user_id,
        account: { account_type_id, color, current_balance, has_yield, title }
      })

      return res.json()
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }

  async delete(req, res) {
    try {
      const user_id = req.user.id
      const { id } = req.params

      const account = await Account.getById({ id, user_id })

      if (!account) {
        throw new AppError('Conta não encontrada', 404)
      }

      await Account.delete({ id, user_id })

      return res.json()
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error)
        return res.json(error)
      }
    }
  }
}

module.exports = AccountsController
