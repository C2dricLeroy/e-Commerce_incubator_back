const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

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

    const user = await this.user.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const xsrfToken = crypto.randomBytes(64).toString('hex');
      const token = jwt.sign({}, process.env.SECRET_KEY, {
        algorithm: 'HS256',
        audience: 'myApp',
        expiresIn: 86400,
        issuer: 'myIssuer',
      });
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: false,
        // maxAge: 86400,
      })
        .status(200).json(user);
      return {
        message: 'Successfully logged in',
        xsrfToken,
        userId: user.id,
      };
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
}

module.exports = UserService;
