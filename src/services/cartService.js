const { PrismaClient } = require('@prisma/client');

class CartService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserCart(req, res, id) {
    try {
      return await this.prisma.cart.findUnique({
        where: {
          id: +id,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = CartService;
