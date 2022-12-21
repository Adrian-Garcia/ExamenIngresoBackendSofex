# Sofex Employee Registration
This application was developed as an entrance exam for the company Sofex. The purpose of this project is to manage the company's employee registration only from the backend. 
For this, a REST system was developed in which the following requests can be made:
- Employee CRUD
- Week CRUD
- Day CRUD
- Week Start and Restart
- Check In
- Check Out
- Employee Payment Calculations

## Development

### Setup the project
1. Clone this repository
```bash
git clone https://github.com/Adrian-Garcia/ExamenIngresoBackendSofex.git
```
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
```json
{
    "firstName": "Luke",
    "lastName":  "Skywalker",
    "positionName": "Programer",
    "hourlyWage": 200
}
```
- Check In Employee http://localhost:3000/api/v1/employees/check_in
```json
{
    "time": "2023-01-02T00:00:00.000Z"
}
```
- Check Out Employee http://localhost:3000/api/v1/employees/check_out
```json
{
    "time": "2023-01-02T00:00:00.000Z"
}
```
- Get One Employee http://localhost:3000/api/v1/employees/abcd1234
- Get All Employees http://localhost:3000/api/v1/employees/
- Delete One Employee http://localhost:3000/api/v1/employees/abcd1234
- Get Payments of all employees http://localhost:3000/api/v1/employees/payment_employees/
- Get Payment of one employee http://localhost:3000/api/v1/employees/payment_employees/abcd1234
- Check In http://localhost:3000/api/v1/employees/check_in/abcd1234
- Check Out http://localhost:3000/api/v1/employees/check_out/abcd1234

### Week
- Create http://localhost:3000/api/v1/weeks/
```json
{
    "startWeek": "2023-01-02T00:00:00.000Z",
    "endWeek": "2023-01-06T00:00:00.000Z",
    "finalWeekPayment":  10000,
    "employeeId": "abcd1234"
}
```
- Edit http://localhost:3000/api/v1/weeks/1
```json
{
    "startWeek": "2023-01-02T00:00:00.000Z",
    "endWeek": "2023-01-06T00:00:00.000Z",
    "finalWeekPayment":  10000,
    "employeeId": "abcd1234"
}
```
- Get One Week http://localhost:3000/api/v1/week/1
- Get All Weeks http://localhost:3000/api/v1/weeks/
- Delete One Week http://localhost:3000/api/v1/weeks/1
- Revert all weeks http://localhost:3000/api/v1/weeks/new_week
- Revert one week http://localhost:3000/api/v1/weeks/new_week/1

### Day
- Create http://localhost:3000/api/v1/days/
```json
{
    "arrivalTime": "2023-01-02T00:00:00.000Z",
    "departureTime": "2023-01-06T00:10:00.000Z",
    "weekId":  1
}
```
- Edit http://localhost:3000/api/v1/days/1
```json
{
    "arrivalTime": "2023-01-02T00:00:00.000Z",
    "departureTime": "2023-01-02T10:00:00.000Z",
    "weekId":  1
}
```
- Get One Day http://localhost:3000/api/v1/day/1
- Get All Days http://localhost:3000/api/v1/day/
- Delete One Day http://localhost:3000/api/v1/day/1
