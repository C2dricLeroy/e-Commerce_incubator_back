const CartService = require('../services/cartService');

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async getUserCart(req, res, id) {
    try {
      await this.cartService.getUserCart(req, res, id);
      res.status(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
      return null;
    }
  }

  async saveCart(req, res) {
    try {
      await this.cartService.saveCart(req, res);
      res.status(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }
}

module.exports = CartController;