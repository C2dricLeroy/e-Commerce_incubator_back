const express = require('express');
const UserController = require('../controllers/userController');
const validateRessourceMiddleware = require('../middlewares/validateResource');

const userSchema = require('../models/validator');

const router = express.Router();
const userController = new UserController();

router.post('/create', validateRessourceMiddleware(userSchema), async (req, res) => {
  await userController.createUser(req, res);
});

router.post('/login', async (req, res) => {
  await userController.loginUser(req, res);
});

router.get('/', async (req, res) => {
  console.log('hello');
});

module.exports = router;
