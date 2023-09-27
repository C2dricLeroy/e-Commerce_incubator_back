const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', async (req, res) => {
  await userController.createUser(req, res);
});

module.exports = router;
