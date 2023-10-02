const { PrismaClient } = require('@prisma/client');

class CategoryService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(req, res) {
    try {
      const categories = await this.prisma.productType.findMany();
      res.status(200).json(categories);
      return categories;
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des catégories' });
      return null;
    }
  }
}

module.exports = CategoryService;
