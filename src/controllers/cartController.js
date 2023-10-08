const CartService = require('../services/cartService');

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async getUserCart(req, res, id) {
    try {
      const response = await this.cartService.getUserCart(req, res, id);
      res.status(200).json(response.cart);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }

  async saveCart(req, res) {
    try {
      const cart = await this.cartService.saveCart(req, res);
      res.status(200).json(cart);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }
}

module.exports = CartController;
