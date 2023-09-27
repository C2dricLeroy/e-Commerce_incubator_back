const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/create', async (req, res) => {
  await userController.createUser(req, res);
});

router.get('/', async (req, res) => {
  console.log('hello');
});

module.exports = router;
