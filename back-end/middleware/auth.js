const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {
  const token = req.cookies.token
  if (token) {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) next();
  }
  else return res.status(401).render('index', { state: { message: 'Login required' } });
}

module.exports = isAuth;