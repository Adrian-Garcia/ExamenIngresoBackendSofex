# Registro de empleados Sofex
Esta aplicación fue desarrollada como un examen de ingreso para la empresa Sofex. Este projecto, tiene la finalidad de administrar el registro de empleados de la empresa únicamente desde el apartado backend. 
Para esto, se desarrolló un sistema REST en el cual se pueden hacer las siguientes peticiones :
- CRUD de Empleados
- CRUD de Semanas
- CRUD de días
- Registrar entrada y salida
- Inicio de semana
- Pago de empleados

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
3. Start localhost database (http://localhost:5050/)
```bash
docker-compose up -d pgadmin
```

