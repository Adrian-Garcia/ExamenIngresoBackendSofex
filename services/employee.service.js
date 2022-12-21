const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

function calculateFinalWeekPayment(weeklyHours, hourlyWage) {
  const maxHours = 40;
  const extraHoursCost = 2;

  extraHours = weeklyHours % maxHours;
  extraHoursPayment = extraHoursCost * extraHours * hourlyWage;

  ordinaryHours = weeklyHours - extraHours;
  ordinaryHoursPayment = ordinaryHours * hourlyWage;

  return ordinaryHoursPayment + extraHoursPayment;
}

class EmployeeService {
  constructor() {}

  async create(data) {
    const employee = await models.Employee.findByPk(data["id"]);

    if (employee) {
      throw boom.conflict(`Employee with id ${data["id"]} already exists`);
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

  async calculateWeeklyHours(week) {
    if (!week) {
      return 0;
    }

    let totalHours = 0;
    const days = await models.Day.findAll({
      where: {
        week_id: week.id
      }
    });

    for (let i=0; i<days.length; i++) {
      let day = days[i];
      totalHours += Math.abs(day.arrivalTime - day.departureTime) / 36e5;
    }
    return totalHours;
  }

  async calculatePaymentEmployee(id) {
    const employee = await this.findOne(id);
    const week = await models.Week.findOne({
      where: {
        employee_id: id
      }
    });
    const hoursWorkded = await this.calculateWeeklyHours(week);
    const finalWeekPayment = calculateFinalWeekPayment(hoursWorkded, employee.hourlyWage);

    return {
      "id": employee.id,
      "firstName": employee.firstName,
      "lastName": employee.lastName,
      "hoursWorkded": hoursWorkded,
      "finalWeekPayment": finalWeekPayment,
    };
  }

  async calculatePaymentEmployees() {
    const employees = await models.Employee.findAll();
    let response = [];

    for (let i = 0; i < employees.length; i++) {
      const employeeInfo = await this.calculatePaymentEmployee(employees[i].id) 
      response.push(employeeInfo);
    }

    return response;
  }

  async getLastDay(employee) {
    const week = await models.Week.findOne({
      where: {
        employee_id: employee.id
      }
    });

    if (!week) {
      throw boom.conflict('Employee has no week. Create a week for the employee first');
    }

    const days = await models.Day.findAll({
      where: {
        week_id: week.id,
      }
    });

    const lastDay = days[days.length - 1];

    if (lastDay.departureTime) {
      return await models.Day.create({
        weekId: week.id,
      });
    }

    return lastDay;
  }

  async checkIn(lastDay, time) {
    return await lastDay.update({
      arrivalTime: time || Date.now(),
    });
  }

  async checkOut(lastDay, time) {
    return await lastDay.update({
      departureTime: time || Date.now(),
    });
  }
}

module.exports = EmployeeService;
