const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

class UserService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const date = new Date();
      const uuid = uuidv4();
      const hash = await bcrypt.hash(password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          uuid,
          username,
          password: hash,
          email,
          datetime: date,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur' });
    }
  }
}

module.exports = UserService;
