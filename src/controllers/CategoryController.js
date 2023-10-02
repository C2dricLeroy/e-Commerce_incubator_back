const CategoryService = require('../services/CategoryService');

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAll(req, res) {
    try {
      const categories = await this.categoryService.getAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }
}

module.exports = CategoryController;
