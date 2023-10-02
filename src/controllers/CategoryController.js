const CategoryService = require('../services/CategoryService');

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAll(req, res) {
    try {
      return await this.categoryService.getAll(req, res);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = CategoryController;
