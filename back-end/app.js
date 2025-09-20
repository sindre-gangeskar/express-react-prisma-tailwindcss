require('dotenv').config();
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');
var productsRouter = require('./routes/products');
var jwt = require('jsonwebtoken');
const errorHandler = require('./middleware/errorHandler');
const jsend = require('jsend');
const cors = require('cors')
var app = express();


app.set('view engine', 'ejs');

app.use(cors({origin: process.env.FRONTEND_URL}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join('node_modules', 'bootstrap', 'dist')));

app.use(jsend.middleware);

app.use(session({ secret: 'super secret', resave: false, saveUninitialized: false, cookie: { secure: false } }));

app.use((req, res, next) => {
  res.locals.session = req.session;
  const token = req.cookies.token;

  if (token) {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.session.user = { username: verified.username };
  } else req.session.user = null;

  next();
})

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/products', productsRouter);

app.use((req, res, next) => {
  return next(createError(404))
})

app.use(errorHandler);

module.exports = app;
