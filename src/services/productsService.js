const Product = require('../models/Products');

class ProductsService {
  static async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(201).json(products);
      return products;
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits' });
      return null;
    }
  }

  static async getTopProducts(req, res) {
    try {
      const products = await Product.findAll();
      const topProducts = await this.defineTopProducts(products);
      res.status(201).json(topProducts);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits' });
    }
  }

  static async defineTopProducts(products) {
    if (products.length < 3) {
      throw new Error("Il n'y a pas suffisamment de produits pour en extraire trois au hasard.");
    }

    const topProducts = [];

    for (let i = 0; i < 3; i += 1) {
      const randomIndex = Math.floor(Math.random() * products.length);
      topProducts.push(products[randomIndex]);
    }

    return topProducts;
  }
}

module.exports = ProductsService;
