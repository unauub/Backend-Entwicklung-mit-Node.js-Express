const fs = require('fs');
const express = require('express');
const tourRouter = require('./routes/tour.route');
const userRouter = require('./routes/user.route');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  console.log('Dev Process 🤞');
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Tours Routes
app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users/', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
