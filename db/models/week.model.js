const { Model, DataTypes, Sequelize } = require('sequelize');

const { EMPLOYEE_TABLE } = require('./employee.model');

const WEEK_TABLE = 'weeks';

const WeekSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  startWeek: {
    type: DataTypes.DATE
  },
  endWeek: {
    type: DataTypes.DATE
  },
  finalWeekPayment: {
    type: DataTypes.FLOAT
  },
  employeeId: {
    field: 'employee_id',
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: EMPLOYEE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Week extends Model {
  static associate(models) {
    this.belongsTo(models.Employee, {as: 'employee'});
    this.hasMany(models.Day, {
      as: 'days',
      foreignKey: 'weekId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WEEK_TABLE,
      modelName: 'Week',
      timestamps: false
    }
  }
}

module.exports = { WEEK_TABLE, WeekSchema, Week }
