const { Category } = require('../models/Category')

class CategoriesController {
  async index(req, res) {
    const user_id = req.user.id
    const { type } = req.body

    const categories = await Category.getAll({ user_id, type })

    if (categories.length == 0) {
      throw new AppError('Nenhuma categoria encontrada', 404)
    }

    return res.json(categories)
  }

  async show(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const { type } = req.body

    const category = await Category.getById({ id, user_id, type })

    if (!category) {
      throw new AppError('Categoria não encontrada', 404)
    }

    return res.json(category)
  }

  async create(req, res) {
    const user_id = req.user.id
    const { title, color, type } = req.body

    const categoryId = await Category.insertNew({
      type,
      category: { color, title, user_id }
    })

    return res.json(categoryId)
  }

  async update(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const { title, color, type } = req.body

    await Category.update({
      id,
      type,
      user_id,
      category: { color, title }
    })

    return res.json()
  }

  async delete(req, res) {
    const user_id = req.user.id
    const { id } = req.params
    const { type } = req.body

    await Category.delete({ id, user_id, type })

    return res.json()
  }
}

module.exports = CategoriesController
