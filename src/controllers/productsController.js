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

  async getProductById(req, res, productId) {
    try {
      return await this.productService.getProductById(req, res, productId);
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

  async searchProduct(req, res, slug) {
    try {
      return await this.productService.searchProduct(req, res, slug);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = ProductsController;
