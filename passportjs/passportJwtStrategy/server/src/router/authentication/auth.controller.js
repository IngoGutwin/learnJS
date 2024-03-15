const passport = require('passport');
const User = require('../../models/user.model');
const {
  genPassword,
  validatePassword,
  issueJWT,
} = require('../../config/password.utils');

function httpLoginUser(req, res, next) {
  const userRequest = {
    username: req.body.username,
    password: req.body.password,
  };
  User.get('username', userRequest.username)
    .then((userLocal) => {
      if (!userLocal) {
        return res.status(401).json({ ok: false, message: 'user not found' });
      }
      const isValid = validatePassword(
        userRequest.password,
        userLocal.hash,
        userLocal.salt,
      );
      if (isValid) {
        const tokenObject = issueJWT(userLocal.id);
        return res
          .status(200)
          .json({ ok: true, token: tokenObject.token, expiresIn: tokenObject.expires });
      }
      return res.status(401).json({ ok: false, message: 'wrong password' });
    })
    .catch((err) => next(err));
}

function httpRegisterNewUser(req, res) {
  const saltHash = genPassword(req.body.password);
  const user = {
    username: req.body.username,
    email: req.body.email,
    hash: saltHash.hash,
    salt: saltHash.salt,
  };
  User.save(user)
    .then(() => res.status(201).json({ ok: true, message: 'user created' }))
    .catch((err) => res.status(409).json({ ok: false, message: err }));
}

function isAuth(req, res, next) {
  console.log('isAuth: ', req.headers);
  if (req.path.includes('member')) {
    passport.authenticate('jwt', { session: false });
  }
  return next();
}

module.exports = {
  httpLoginUser,
  httpRegisterNewUser,
  isAuth,
};
