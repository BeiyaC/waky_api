const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const tagRouter = require('./routes/tags');
const authenticationRouter = require('./routes/authentication');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/tags', tagRouter);

module.exports = app;
