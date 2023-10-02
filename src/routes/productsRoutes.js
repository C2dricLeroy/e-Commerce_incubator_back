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

router.get('/getOne/:id', async (req, res) => {
  const productId = req.params.id;
  await productController.getProductById(req, res, productId);
});

module.exports = router;
