const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', usersRouter);

app.use(function (req, res, next) {
    res.status(404).json({error: 'Sorry but the resource doesnt exist!'});
});

app.use(function (err, req, res, next) {
    if(err.name === 'MissingParamError')
        res.status(400).json({error: err.message});
    else
        res.status(500).json({error: err.message});
});

module.exports = app;
