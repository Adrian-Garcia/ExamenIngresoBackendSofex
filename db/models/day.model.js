const { Model, DataTypes, Sequelize } = require('sequelize');

const { WEEK_TABLE } = require('./week.model');

const DAY_TABLE = 'days';

const DaySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  arrivalTime: {
    type: DataTypes.DATE
  },
  departureTime: {
    type: DataTypes.DATE
  },
  weekId: {
    field: 'week_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: WEEK_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Day extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: DAY_TABLE,
      modelName: 'Day',
      timestamps: false
    }
  }
}

module.exports = { DAY_TABLE, DaySchema, Day }
