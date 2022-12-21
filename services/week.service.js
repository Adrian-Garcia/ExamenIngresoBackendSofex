const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class WeekService {
  constructor() {}

  async create(data) {
    const employee = await models.Employee.findByPk(data["employeeId"]);

    if (!employee) {
      throw boom.conflict('Employee not found');
    }

    const newWeek = await models.Week.create(data);
    return newWeek;
  }

  async find() {
    const weeks = await models.Week.findAll();
    return weeks;
  }

  async findOne(id) {
    const week = await models.Week.findByPk(id);
    if (!week) {
      throw boom.notFound('Week not found');
    }
    return week;
  }

  async update(id, changes) {
    const week = await this.findOne(id);
    const response = await week.update(changes);
    return response;
  }

  async delete(id) {
    const week = await this.findOne(id);
    await week.destroy();
    return { id };
  }

  async calculateWeeklyHours(days) {
    var totalHours = 0
    for (let i=0; i<days.length; i++) {
      var day = days[i];
      totalHours += Math.abs(day.arrivalTime - day.departureTime) / 36e5;
      await day.destroy();
    }
    return totalHours;
  }

  async resetWeek(week) {
    const days = await models.Day.findAll({
      where: {
        week_id: week.id
      }
    });
    const hours = await this.calculateWeeklyHours(days)
    await week.update({
      "startWeek": 0,
      "endWeek": 0,
    });
    return hours;
  }

  async resetWeeks() {
    const weeks = this.find();
    let totalWorkedHours = 0;
    for (let i = 0; i< weeks.length; i++) {
      totalWorkedHours = await this.resetWeek(weeks[i]);
    }
    return totalWorkedHours;
  }
}

module.exports = WeekService;
