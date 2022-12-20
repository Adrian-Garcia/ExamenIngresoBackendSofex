const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class EmployeeService {
  constructor() {}

  async create(data) {
    const employee = await models.Employee.findByPk(data["id"]);

    if (employee) {
      throw boom.notFound(`Employee with id ${data["id"]} already exists`);
    }

    const newEmployee = await models.Employee.create(data);
    return newEmployee;
  }

  async find() {
    const rta = await models.Employee.findAll();
    return rta;
  }

  async findOne(id) {
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      throw boom.notFound('Employee not found');
    }
    return employee;
  }

  async update(id, changes) {
    const employee = await this.findOne(id);
    const rta = await employee.update(changes);
    return rta;
  }

  async delete(id) {
    const employee = await this.findOne(id);
    await employee.destroy();
    return { id };
  }
}

module.exports = EmployeeService;
