# challenge-yappa-backend
Este repositorio contiene la resolución al challenge de backend de Yappa

## Host de la API
La API se encuentra hosteada en fly.io en la siguiente URL: [challenge-yappa-backend.fly.dev](https://challenge-yappa-backend.fly.dev)

## Tecnologías utilizadas
- NodeJS
- Express
- MySQL
- Sequelize
- Swagger
- Nodemon
- Dotenv
- Cors
- Body-parser

## Requerimientos
- Node
- NPM
- MySQL (local): Se debe crear una base de datos con el nombre `challenge` y ejecutar el script `create_localhost.sql` y posteriormente el script `fill_localhost.sql` que se encuentra en la carpeta `db`
- Archivo .env con las variables de entorno:
  - DB_HOST
  - DB_USER
  - DB_PASS
  - DB_NAME
  - DB_PORT

## Instalación
- Clonar el repositorio
- Ejecutar `npm install` en la carpeta raíz del proyecto
- Ejecutar `npm start` para iniciar el servidor
- El servidor estará corriendo en el puerto 3000

## Endpoints
- GET /client (Listado) - Se puede enviar el parámetro seach para filtrar por nombre, apellido o cuit
- GET /client/:id (Obtener por ID)- Se debe enviar el ID del cliente como parámetro en la URL
- POST /client (Creación) - Se debe enviar un JSON por body con los datos del cliente
- PATCH /client/:id (Actualización parcial)
- DELETE /client/:id (Borrado lógico)
- GET /api-docs (Documentación de la API)