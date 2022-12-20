const express = require('express');

const DayService = require('./../services/day.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateDaySchema, createDaySchema, getDaySchema } = require('./../schemas/day.schema');

const router = express.Router();
const service = new DayService();

router.get('/', async (req, res, next) => {
  try {
    const days = await service.find();
    res.json(days);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getDaySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const day = await service.findOne(id);
      res.json(day);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createDaySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDay = await service.create(body);
      res.status(201).json(newDay);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getDaySchema, 'params'),
  validatorHandler(updateDaySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const day = await service.update(id, body);
      res.json(day);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getDaySchema, 'params'),
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

module.exports = router;
