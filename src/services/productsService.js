const { PrismaClient } = require('@prisma/client');

class ProductsService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getProducts(req, res) {
    try {
      const products = await this.prisma.product.findMany(
        {
          include: {
            product_type: true,
          },
        },
      );
      res.status(200).json(products);
      return products;
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits' });
      return null;
    }
  }

  async getTopProducts(req, res) {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          product_type: true,
        },
      });
      const topProducts = this.defineTopProducts(products);
      res.status(200).json(topProducts);
      return topProducts;
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits' });
      return null;
    }
  }

  defineTopProducts(products) {
    if (this && products.length < 3) {
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
