const express = require('express');
const UserController = require('../controllers/userController');
const validateRessourceMiddleware = require('../middlewares/validateResource');
const isAuthenticated = require('../middlewares/authentication');
const { userSchema } = require('../models/validator');
const { loginSchema } = require('../models/validator');

const router = express.Router();
const userController = new UserController();

router.post('/create', validateRessourceMiddleware(userSchema), async (req, res) => {
  await userController.createUser(req, res);
});

router.post('/login', validateRessourceMiddleware(loginSchema), async (req, res) => {
  await userController.loginUser(req, res);
});

router.get('/logout', async (req, res) => {
  await userController.logout(req, res);
});

router.get('/isLoggedIn', async (req, res) => {
  await userController.isLoggedIn(req, res);
});

router.get('/getUsernameById/:id', isAuthenticated, async (req, res) => {
  await userController.getUsernameById(req, res, req.params.id);
});

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
  await userController.deleteUser(req, res, req.params.id);
});

module.exports = router;
