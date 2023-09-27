const userService = require('../services/userService');

class UserController {
  static async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req, res);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }
}

module.exports = UserController;
