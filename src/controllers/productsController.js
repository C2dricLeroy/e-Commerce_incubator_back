const ProductsService = require('../services/productsService');

class ProductsController {
  static async getProducts(req, res) {
    try {
      const products = await ProductsService.getProducts(req, res);
      res.status(201).json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }

  static async getTopProducts(req, res) {
    try {
      const products = await ProductsService.getTopProducts(req, res);
      res.status(201).json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }
}

module.exports = ProductsController;
