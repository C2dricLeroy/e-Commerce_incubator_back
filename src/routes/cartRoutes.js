const express = require('express');
const CartController = require('../controllers/cartController');
const validateRessourceMiddleware = require('../middlewares/validateResource');
const { cartSchema } = require('../models/validator');
const isAuthenticated = require('../middlewares/authentication');

const router = express.Router();
const cartController = new CartController();

router.get('/getUserCart/:id', isAuthenticated, async (req, res) => {
  await cartController.getUserCart(req, res, req.params.id);
});

router.post('/saveCart', validateRessourceMiddleware(cartSchema), async (req, res) => {
  await cartController.saveCart(req, res);
});

module.exports = router;
