const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); // Correct path

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user.id);
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};

module.exports = auth;
