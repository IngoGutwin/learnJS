const fs = require('node:fs');
const path = require('node:path');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/user.model');

const pathToPubKey = path.join(__dirname, '../../id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

function verifyCallback(jwtPayload, done) {
  User.get('id', jwtPayload.sub).then((user) => {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

module.exports = (passport) => {
  passport.use(new Strategy(options, verifyCallback));
};
