const { Model, DataTypes, Sequelize } = require('sequelize');

const EMPLOYEE_TABLE = 'employees';

const EmployeeSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  positionName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  hourlyWage: {
    allowNull: false,
    type: DataTypes.FLOAT
  }
}

class Employee extends Model {
  static associate(models) {
    this.hasMany(models.Week, {
      as: 'weeks',
      foreignKey: 'employeeId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: 'Employee',
      timestamps: false
    }
  }
}

module.exports = { EMPLOYEE_TABLE, EmployeeSchema, Employee }
