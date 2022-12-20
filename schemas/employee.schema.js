const Joi = require('joi');

const id = Joi.string().min(8);
const firstName = Joi.string();
const lastName = Joi.string();
const positionName = Joi.string();
const hourlyWage = Joi.number();

const createEmployeeSchema = Joi.object({
  id: id.required(),
  firstName: firstName.required(),
  lastName: lastName.required(),
  positionName: positionName.required(),
  hourlyWage: hourlyWage.required(),
});

const updateEmployeeSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  positionName: positionName.required(),
  hourlyWage: hourlyWage.required(),
});

const getEmployeeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createEmployeeSchema, updateEmployeeSchema, getEmployeeSchema }
