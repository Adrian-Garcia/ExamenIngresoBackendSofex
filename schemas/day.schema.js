const Joi = require('joi');

const id = Joi.number().integer();
const arrivalTime = Joi.date().timestamp();
const departureTime = Joi.date().timestamp();

const createDaySchema = Joi.object({
  arrivalTime: arrivalTime,
  departureTime: departureTime,
});

const updateDaySchema = Joi.object({
  arrivalTime: arrivalTime,
  departureTime: departureTime,
});

const getDaySchema = Joi.object({
  id: id.required(),
});

module.exports = { createDaySchema, updateDaySchema, getDaySchema }
