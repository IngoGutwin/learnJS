const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user.model');

const { validatePassword } = require('./password.utils');

function verifyCallback(username, password, done) {
  User.getPassword(username)
    .then((result) => {
      if (!result) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      let isPasswordValid = validatePassword(password, result.hash, result.salt);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, result.username);
    })
    .catch((err) => {
      console.log(err);
    });
}

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user);
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(function() {
    return cb(null, user);
  });
});
