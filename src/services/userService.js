const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

class UserService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  isValidPassword(password) {
    const hasSpecialCharacter = /[^a-zA-Z0-9\s]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    if (this && (!hasSpecialCharacter || !hasDigit || !hasUppercase)) {
      console.error('Invalid password');
      return false;
    }
    return password.length > 8;
  }

  async createUser(req, res) {
    const { username, email, password } = req.body;
    const date = new Date();
    const uuid = uuidv4();

    if (!this.isValidPassword(password)) {
      throw new Error('Invalid password');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.findUnique({
      select: {
        email: true,
      },
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('Email already used');
    } else {
      try {
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
}

module.exports = UserService;
