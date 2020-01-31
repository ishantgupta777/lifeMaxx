var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var db = require('./db/mongoose')

var formRouter = require('./routes/form');
var safePeople = require('./routes/safePeople')
var unSafePeople = require('./routes/unsafePeople')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', formRouter);
app.use('/safePeople', safePeople)
app.use('/unsafePeople', unSafePeople)

module.exports = app;