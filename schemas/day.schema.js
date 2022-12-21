const Joi = require('joi');

const id = Joi.number().integer();
const arrivalTime = Joi.date().timestamp();
const departureTime = Joi.date().timestamp();
const weekId = Joi.number().integer();

const createDaySchema = Joi.object({
  arrivalTime: arrivalTime,
  departureTime: departureTime,
  weekId: weekId,
});

const updateDaySchema = Joi.object({
  arrivalTime: arrivalTime,
  departureTime: departureTime,
  weekId: weekId,
});

const getDaySchema = Joi.object({
  id: id.required(),
});

module.exports = { createDaySchema, updateDaySchema, getDaySchema }
