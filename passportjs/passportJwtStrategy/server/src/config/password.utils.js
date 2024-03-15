const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('node:fs');
const path = require('node:path');

const pathToPrivateKey = path.join(__dirname, '../../id_rsa_priv.pem');
const PRIVATE_KEY = fs.readFileSync(pathToPrivateKey, 'utf8');

function validatePassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return {
    salt,
    hash,
  };
}

function issueJWT(userId) {
  const expiresIn = '7d';
  const payload = {
    sub: userId,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn,
    algorithm: 'RS256',
  });
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

module.exports = {
  validatePassword,
  genPassword,
  issueJWT,
};
