const express = require('express');
const UserController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/authentication');

const router = express.Router();
const userController = new UserController();

router.get('/getUserCart/:id', isAuthenticated, async (req, res) => {
  await userController.getUserCart(req, res, req.params.id);
});
