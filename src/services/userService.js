const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

  async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await this.findOneByEmail(email);
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 86400 * 1000);

    if (user && (await bcrypt.compare(password, user.password))) {
      const xsrfToken = crypto.randomBytes(64).toString('hex');
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        algorithm: 'HS256',
        audience: 'myApp',
        expiresIn: expirationDate,
        issuer: 'myIssuer',
      });

      res.cookie('accessToken', token, {
        secure: false,
        expires: expirationDate,
      });

      /* req.session.user = user; */

      const responseJson = {
        message: 'Successfully logged in',
        xsrfToken,
        userId: user.id,
      };

      res.status(200).json(responseJson);
      return responseJson;
    }
    throw new Error('Email ou mot de passe incorrect.');
  }

  async findOneByEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Format d'e-mail invalide.");
    }
    return this.prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });
  }

  async logout(req, res) {
    this.test = '';
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  async getUsernameById(req, res, id) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
        select: {
          username: true,
        },
      });
      res.status(200).json(user);
      return user;
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récuperation de l\'utilisateur' });
      return null;
    }
  }

  async isLoggedIn(req, res) {
    try {
      const token = req.cookies.accessToken;

      if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({ message: 'authentifié', userData: decodedToken });
      }
      return res.status(401).json({ message: 'non authentifié' });
    } catch (error) {
      return res.status(401).json({ message: 'erreur de vérification du token' });
    }
  }

  async deleteUser(req, res, id) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: +id,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = UserService;
