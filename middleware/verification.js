const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedUser) => {
    if (err || !decodedUser) return res.status(401).json({ error: 'You are not authorized to do that.'});
    req.decodedUser = decodedUser;
    next();
  })
}

module.exports = verifyToken;