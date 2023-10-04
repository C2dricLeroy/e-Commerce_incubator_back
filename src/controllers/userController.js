const UserService = require('../services/userService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req, res) {
    try {
      await this.userService.createUser(req, res);
      res.status(201);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }

  async loginUser(req, res) {
    try {
      await this.userService.loginUser(req, res);
      res.status(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }

  async isLoggedIn(req, res) {
    try {
      await this.userService.isLoggedIn(req, res);
      res.status(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }

  async logout(req, res) {
    try {
      await this.userService.logout(req, res);
      res.status(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite.' });
    }
  }
}

module.exports = UserController;
