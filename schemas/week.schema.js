const Joi = require('joi');

const id = Joi.number().integer();
const startWeek = Joi.date().timestamp();
const endWeek = Joi.date().timestamp();
const finalWeekPayment = Joi.number();
const employeeId = Joi.string();

const createWeekSchema = Joi.object({
  startWeek: startWeek,
  endWeek: endWeek,
  finalWeekPayment: finalWeekPayment,
  employeeId: employeeId,
});

const updateWeekSchema = Joi.object({
  startWeek: startWeek,
  endWeek: endWeek,
  finalWeekPayment: finalWeekPayment,
  employeeId: employeeId,
});

const getWeekSchema = Joi.object({
  id: id.required(),
});

module.exports = { createWeekSchema, updateWeekSchema, getWeekSchema }
