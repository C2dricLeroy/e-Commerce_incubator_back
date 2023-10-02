const express = require('express');
const ProductsController = require('../controllers/productsController');

const router = express.Router();
const productController = new ProductsController();

router.get('/getAll', async (req, res) => {
  await productController.getProducts(req, res);
});

router.get('/getTop', async (req, res) => {
  await productController.getTopProducts(req, res);
});

module.exports = router;
