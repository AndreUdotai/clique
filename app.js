import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import passport from 'passport';
require('./passport');

import { confirmToken } from "./confirmToken";

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users').default;
let postsRouter = require('./routes/posts');
let authRouter  = require('./routes/auth').default;

// let commentsRouter = require('./routes/comments');

const app = express();

const mongoose = require('mongoose');
require('dotenv').config();

// Set up mongoose connection
// const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = process.env.MY_MONGODB_URI
mongoose.connect(mongoDB);
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', authRouter);
app.use('/api', passport.authenticate('jwt', {session: false}), confirmToken, postsRouter);
app.use('/api', passport.authenticate('jwt', {session: false}), confirmToken, usersRouter);

// app.use('/api', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
