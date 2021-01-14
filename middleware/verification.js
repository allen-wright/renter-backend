const verifySession = (req, res, next) => {
  if (!req.session.key) {
    return res.status(401).json({ error: 'You are not authorized to do that.' });
  }
  next();
}

module.exports = verifySession;