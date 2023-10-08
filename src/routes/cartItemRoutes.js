const express = require('express');
const { cartItemSchema } = require('../models/validator');
const validateRessourceMiddleware = require('../middlewares/validateResource');
const isAuthenticated = require('../middlewares/authentication');
const CartItemController = require('../controllers/cartItemController');

const router = express.Router();
const cartItemController = new CartItemController();

router.get('/:id', isAuthenticated, async (req, res) => {
  await cartItemController.getCartItemBysCartId(req, res, req.params.id);
});

router.post('/save', validateRessourceMiddleware(cartItemSchema), async (req, res) => {
  await cartItemController.save(req, res);
});

module.exports = router;
