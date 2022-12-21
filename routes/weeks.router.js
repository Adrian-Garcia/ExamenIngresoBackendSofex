const express = require('express');

const WeekService = require('./../services/week.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateWeekSchema, createWeekSchema, getWeekSchema } = require('./../schemas/week.schema');

const router = express.Router();
const service = new WeekService();

router.get('/', async (req, res, next) => {
  try {
    const weeks = await service.find();
    res.json(weeks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getWeekSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const week = await service.findOne(id);
      res.json(week);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createWeekSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newWeek = await service.create(body);
      res.status(201).json(newWeek);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getWeekSchema, 'params'),
  validatorHandler(updateWeekSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const week = await service.update(id, body);
      res.json(week);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getWeekSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/new_week/:id',
  validatorHandler(getWeekSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const week = await service.findOne(id)
      const weekPayment = await service.resetWeek(week);
      res.json(weekPayment);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/new_week/',
  async (req, res, next) => {
    try {
      const totalWorkedHours = await service.resetWeeks();
      res.status(201).json(
        { "totalWorkedHours": totalWorkedHours }
      );
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
