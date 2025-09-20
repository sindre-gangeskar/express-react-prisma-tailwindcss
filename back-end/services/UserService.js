const prisma = require("../prisma/prisma");
const { createAndThrowError } = require("../utils/utils");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  static async getAndAuthorize(username, password) {
    try {
      const user = await prisma.user.findFirst({ where: { username: username } });
      if (!user || !bcrypt.compareSync(password, user.password)) createAndThrowError(401, 'fail', "Invalid credentials");
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET, { algorithm: 'HS512' });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;