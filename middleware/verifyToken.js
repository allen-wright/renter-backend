const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err || !decodedToken) return res.status(401).json('You are not authorized to do that.');
    req.decodedToken = decodedToken;
    next();
  })
}

module.exports = verifyToken;