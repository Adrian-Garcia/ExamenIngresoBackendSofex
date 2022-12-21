# Registro de empleados Sofex
This application was developed as an entrance exam for the company Sofex. The purpose of this project is to manage the company's employee registration only from the backend. 
For this, a REST system was developed in which the following requests can be made:
- Employee CRUD
- Week CRUD
- Day CRUD
- Check in and check out
- Week Start and Restart
- Employee Payment Calculations

## Development

### Setup the project
1. Clone this repository
2. Install dependencies 
```bash
npm i
```

### Run the project
1. Start application
```bash
nodemon start
```
2. Start Database 
```bash
docker-compose up -d postgres
```
3. Setup environment variables in .env file

4. Start localhost database (http://localhost:5050/)
```bash
docker-compose up -d pgadmin
```

5. Go to local and configure a new database. [Documentation here](https://www.pgadmin.org/docs/pgadmin4/development/database_dialog.html)

6. Test API in http://localhost:3000/api/v1/

## Main APIs
### Employee
- Create http://localhost:3000/api/v1/employees/
```json
{
    "id": "abcd1234",
    "firstName": "Luke",
    "lastName":  "Skywalker",
    "positionName": "Programer",
    "hourlyWage": 200
}
```
- Edit http://localhost:3000/api/v1/employees/abcd1234
```
{
    "firstName": "Luke",
    "lastName":  "Skywalker",
    "positionName": "Programer",
    "hourlyWage": 200
}
```
- Get One Employee http://localhost:3000/api/v1/employees/abcd1234
- Get All Employees http://localhost:3000/api/v1/employees/
- Delete One Employee http://localhost:3000/api/v1/employees/abcd1234
- Get Payments of all employees http://localhost:3000/api/v1/employees/payment_employees/
- Get Payment of one employee http://localhost:3000/api/v1/employees/payment_employees/abcd1234
- Check In http://localhost:3000/api/v1/employees/check_in/abcd1234
- Check Out http://localhost:3000/api/v1/employees/check_out/abcd1234