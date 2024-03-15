const passport = require('passport');
const path = require('node:path');
const express = require('express');
const { isAuth } = require('./authentication/auth.controller');

const publicDir = path.join(__dirname, '../../www/public');
const memberDir = path.join(__dirname, '../../www/member');

const pagesRouter = express.Router();

pagesRouter.get(
  '/member/*',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    return res.sendFile(express.static(memberDir));
  },
);

pagesRouter.get('/', (req, res) => {
  const options = {
    root: publicDir,
    headers: {
    }
  };
  res.sendFile(`${publicDir}/index.html`);
});

module.exports = pagesRouter;
