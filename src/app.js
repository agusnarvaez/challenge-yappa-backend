// Importo express
import express from "express"

// Utilizo el módulo de morgan para registrar solicitudes HTTP en la consola
import morgan from "morgan"

// Utilizo el módulo de cors para permitir solicitudes de otros dominios
import cors from "cors"

// ##### Importo rutas de la API #####
import client from "./routes/client.routes.js"

import { sequelize } from "./db/config.js"

// Inicializo la aplicación
const app = express()

// Pruebo conexión a la base de datos
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

// Configuro el puerto
app.set('port',process.env.PORT || 3000)

// Para que el servidor entienda cors
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173','http://localhost:4200'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors())
app.use(morgan('dev')) // Mensaje formateado como dev
app.use(express.json()) // Para que el servidor entienda json

// Rutas de la API
app.use('/client',client)

export default app