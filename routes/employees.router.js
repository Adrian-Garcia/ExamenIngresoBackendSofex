const express = require('express');

const EmployeeService = require('./../services/employee.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateEmployeeSchema, createEmployeeSchema, getEmployeeSchema, updateEmployeeRegisterSchema } = require('./../schemas/employee.schema');

const router = express.Router();
const service = new EmployeeService();

router.get('/', async (req, res, next) => {
  try {
    const employees = await service.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

router.get('/payment_employees/:id',
  validatorHandler(getEmployeeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const employees = await service.calculatePaymentEmployee(id);
      res.json(employees);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/payment_employees',
  async (req, res, next) => {
    try {
      const employees = await service.calculatePaymentEmployees();
      res.json(employees);
    } catch (error) {
      next(error);
    }
  }
);


router.get('/:id',
  validatorHandler(getEmployeeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = await service.findOne(id);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEmployee = await service.create(body);
      res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getEmployeeSchema, 'params'),
  validatorHandler(updateEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const employee = await service.update(id, body);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getEmployeeSchema, 'params'),
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

router.put('/register_entry/:id',
  validatorHandler(updateEmployeeRegisterSchema, 'params'),
  async (req, res, next) => {
    try {
      // TODO
    } catch (error) {
      next(error);
    }
  }
);

router.put('/register_exit/:id',
  validatorHandler(updateEmployeeRegisterSchema, 'params'),
  async (req, res, next) => {
    try {
      // TODO
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
