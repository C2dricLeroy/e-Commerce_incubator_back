const { PrismaClient } = require('@prisma/client');

class CartItemService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getCartItemByCartId(req, res, id) {
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
    const { cart_id, product_id, quantity } = req.body;

    try {
      return await this.prisma.cartItem.create({
        data: {
          cart_id,
          product_id,
          quantity,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async deleteCartItemById(req, res, id) {
    try {
      return await this.prisma.cartItem.delete({
        where: {
          id: +id,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async updateCartItem(req, res) {
    try {
      return await this.prisma.cartItem.update({
        where: {
          id: +id,
        },
        data: req.body,
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = CartItemService;
