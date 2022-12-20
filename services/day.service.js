const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class DayService {
  constructor() {}

  async create(data) {
    const newDay = await models.Day.create(data);
    return newDay;
  }

  async find() {
    const rta = await models.Day.findAll();
    return rta;
  }

  async findOne(id) {
    const day = await models.Day.findByPk(id);
    if (!day) {
      throw boom.notFound('Day not found');
    }
    return day;
  }

  async update(id, changes) {
    const day = await this.findOne(id);
    const rta = await day.update(changes);
    return rta;
  }

  async delete(id) {
    const day = await this.findOne(id);
    await day.destroy();
    return { id };
  }
}

module.exports = DayService;
