const ProductsService = require('../services/productsService');

class ProductsController {
  constructor() {
    this.productService = new ProductsService();
  }

  async getProducts(req, res) {
    try {
      return await this.productService.getProducts(req, res);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async getTopProducts(req, res) {
    try {
      return await this.productService.getTopProducts(req, res);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = ProductsController;
