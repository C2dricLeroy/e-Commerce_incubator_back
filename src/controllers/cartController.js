const CartService = require('../services/cartService');

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async getCart(req, res, id) {
    try {
      return await this.cartService.getUserCart(req, res, id);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = CartController;
