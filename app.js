const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const indexRouter = require('./routes/index');
const songRouter = require('./routes/song');

const app = express();

//db connection
const db = require('./helper/db')();

//cors
const cors = require('cors');
app.use(cors());

//swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Muce API',
      version: '1.0.0',
      description: 'Muce Base API Service.',
    },
    servers: [
      {
        url: 'https://muce-api.herokuapp.com',
      },
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/song', songRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
