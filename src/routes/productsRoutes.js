const express = require('express');
const ProductsController = require('../controllers/productsController');

const router = express.Router();

router.get('/getAll', async (req, res) => {
  await ProductsController.getProducts(req, res);
});

module.exports = router;
