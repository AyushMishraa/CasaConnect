const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (id, email, role) => {
   return jwt.sign({id, email, role}, secretKey);
}

module.exports = generateToken;
