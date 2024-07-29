const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
   console.log(req.user.userId,"idd")
    next();
  } catch (error) {

    res.status(401).json({ message: 'Authentication failed' });
  }
};