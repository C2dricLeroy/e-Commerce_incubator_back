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

  async saveCart(req, res) {
    const { cart_name, user_id } = req.body;
    const date = new Date();

    try {
      return await this.prisma.cart.create({
        data: {
          cart_name,
          user_id,
          datetime: date,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = CartService;
