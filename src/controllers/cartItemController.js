const CartItemService = require('../services/cartItemService');

class cartItemController {
  constructor() {
    this.cartItemService = new CartItemService();
  }

  async getCartItemBysCartId(req, res, id) {
    try {
      const response = await this.cartItemService.getCartItemByCartId(req, res, id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
      console.log(error.message);
    }
  }

  async save(req, res) {
    try {
      const response = await this.cartItemService.saveCart(req, res);
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }
}

module.exports = cartItemController;
