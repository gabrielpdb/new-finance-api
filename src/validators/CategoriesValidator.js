const { Category } = require('../models/Category')
const AppError = require('../utils/AppError')

function chooseType(req) {
  let type = ''

  if (req.baseUrl === '/income_categories') {
    type = 'income'
  } else if (req.baseUrl === '/expense_categories') {
    type = 'expense'
  }

  return type
}

module.exports = {
  async base(req, res, next) {
    req.body.type = chooseType(req)

    next()
  },

  async post(req, res, next) {
    const user_id = req.user.id
    req.body.type = chooseType(req)
    const { title, color, type } = req.body

    if (!title) {
      throw new AppError('Informe o título da categoria')
    }

    const categoryTitleAlreadyInUse = await Category.getByTitle({
      user_id,
      title,
      type
    })

    if (categoryTitleAlreadyInUse) {
      throw new AppError('Você já possui uma categoria com esse título')
    }

    if (!color) {
      throw new AppError('Informe uma cor para a categoria')
    }

    const categoryColorAlreadyInUse = await Category.getByColor({
      user_id,
      color,
      type
    })

    if (categoryColorAlreadyInUse) {
      throw new AppError('Você já possui uma categoria com essa mesma cor')
    }

    next()
  },

  async put(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params
    req.body.type = chooseType(req)
    const { title, color, type } = req.body

    if (!id) {
      throw new AppError('Informe a categoria a ser atualizada')
    }

    const category = await Category.getById({ id, user_id, type })

    if (!category) {
      throw new AppError('Categoria não encontrada')
    } else {
      req.body.category = category
    }

    if (!title) {
      throw new AppError('Informe o título da categoria')
    }

    const categoryTitleAlreadyInUse = await Category.getByTitle({
      user_id,
      title,
      type
    })

    if (categoryTitleAlreadyInUse && categoryTitleAlreadyInUse.id != id) {
      throw new AppError('Você já possui uma categoria com esse título')
    }

    if (!color) {
      throw new AppError('Informe uma cor para a categoria')
    }

    const categoryColorAlreadyInUse = await Category.getByColor({
      user_id,
      color,
      type
    })

    if (categoryColorAlreadyInUse && categoryColorAlreadyInUse.id != id) {
      throw new AppError('Você já possui uma categoria com essa mesma cor')
    }

    next()
  },

  async relocate(req, res, next) {
    const user_id = req.user.id
    req.body.type = chooseType(req)
    const { origin_category_id, destiny_category_id, type } = req.body

    if (!origin_category_id || !destiny_category_id) {
      throw new AppError('Informe as categorias')
    }

    const origin_category = await Category.getById({
      id: origin_category_id,
      user_id,
      type
    })

    if (!origin_category) {
      throw new AppError('Categoria de origem não encontrada')
    } else {
      req.body.origin_category = origin_category
    }

    const destiny_category = await Category.getById({
      id: destiny_category_id,
      user_id,
      type
    })

    if (!destiny_category) {
      throw new AppError('Categoria de destino não encontrada')
    } else {
      req.body.destiny_category = destiny_category
    }

    next()
  },

  async delete(req, res, next) {
    const user_id = req.user.id
    const { id } = req.params
    req.body.type = chooseType(req)
    const { type } = req.body

    const category = await Category.getById({ id, user_id, type })

    if (!category) {
      throw new AppError('Categoria não encontrada', 404)
    }

    next()
  }
}
