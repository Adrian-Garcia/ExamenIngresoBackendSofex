const Joi = require('joi');

const id = Joi.string().regex(/^[A-Za-z]{4}\d{4}$/);
const firstName = Joi.string();
const lastName = Joi.string();
const positionName = Joi.string();
const hourlyWage = Joi.number();
const time = Joi.date().timestamp();


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

const updateEmployeeRegisterSchema = Joi.object({
  time: time,
});

module.exports = { createEmployeeSchema, updateEmployeeSchema, getEmployeeSchema, updateEmployeeRegisterSchema }
