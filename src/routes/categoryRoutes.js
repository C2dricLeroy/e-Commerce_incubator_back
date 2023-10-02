const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const categoryController = new CategoryController();
const router = express.Router();
router.get('/getAll', async (req, res) => {
  await categoryController.getAll(req, res);
});

module.exports = router;
