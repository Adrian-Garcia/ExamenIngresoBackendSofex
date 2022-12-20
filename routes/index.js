const express = require('express');

const employeesRouter = require('./employees.router');
const weeksRouter = require('./weeks.router');
const daysRouter = require('./days.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/employees', employeesRouter);
  router.use('/weeks', weeksRouter);
  router.use('/days', daysRouter);
}

module.exports = routerApi;
