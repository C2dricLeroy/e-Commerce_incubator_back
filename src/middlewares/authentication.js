const jwt = require('jsonwebtoken');

async function isAuthenticated(req, res, next) {
  const token = req.cookies.accessToken;
  try {
    if (!token) {
      return res.status(401).json('You need to Login');
    } next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
}

module.exports = isAuthenticated;
