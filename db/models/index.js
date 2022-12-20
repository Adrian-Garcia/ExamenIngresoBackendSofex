const { Employee, EmployeeSchema } = require('./employee.model');
const { Week, WeekSchema } = require('./week.model');
const { Day, DaySchema } = require('./day.model');

function setupModels(sequelize) {
  Employee.init(EmployeeSchema, Employee.config(sequelize))
  Week.init(WeekSchema, Week.config(sequelize))
  Day.init(DaySchema, Day.config(sequelize))

  Employee.associate(sequelize.models);
  Week.associate(sequelize.models)
}

module.exports = setupModels;
