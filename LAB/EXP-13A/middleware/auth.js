const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authorization = req.get('Authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Send a Bearer token in the Authorization header.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ message: 'Token is missing, expired or invalid.' });
  }
}

module.exports = requireAuth;
