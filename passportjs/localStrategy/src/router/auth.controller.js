const User = require('../models/user.model');
const { genPassword } = require('../config/password.utils');

function httpRegisterNewUser(req, res) {
  let saltHash = genPassword(req.body.password);
  let user = {
    username: req.body.username,
    hash: saltHash.hash,
    salt: saltHash.salt,
  };

  User.save(user)
    .then(() => res.redirect('/login'))
    .catch((err) => console.log(err));
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.originalUrl === '/protected-route') {
      return res.send(
        '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>',
      );
    }
  } else {
    if (req.originalUrl === '/login') {
      return next();
    }
    return res.send(
      '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>',
    );
  }
}

module.exports = {
  httpRegisterNewUser,
  isAuth,
};
