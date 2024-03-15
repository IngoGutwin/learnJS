require('dotenv').config();
const passport = require('passport');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const api = require('./router/api');
const pagesRouter = require('./router/pages.router');
const authRouter = require('./router/authentication/auth.router');

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(morgan('combined'));

app.use('/user', authRouter);
app.use('/api', api);
app.use(pagesRouter);

module.exports = app;
