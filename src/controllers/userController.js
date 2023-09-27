const userService = require('../services/userService');

class UserController {
  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }

  // ... d'autres méthodes de contrôleur
}

module.exports = new UserController();
