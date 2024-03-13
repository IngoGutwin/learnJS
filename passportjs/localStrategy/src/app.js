require('dotenv').config();
require('./config/passport');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const MariaDBSessionStore = require('express-session-mariadb-store');
const { pool } = require('./service/mariadb.service');

const app = express();

const authRouter = require('./router/auth.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MariaDBSessionStore({ pool: pool }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, // Equals 1 day
    },
  }),
);

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(authRouter);

module.exports = app;
