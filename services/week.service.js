const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class WeekService {
  constructor() {}

  async create(data) {
    const newWeek = await models.Week.create(data);
    return newWeek;
  }

  async find() {
    const rta = await models.Week.findAll();
    return rta;
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
    const rta = await week.update(changes);
    return rta;
  }

  async delete(id) {
    const week = await this.findOne(id);
    await week.destroy();
    return { id };
  }
}

module.exports = WeekService;
