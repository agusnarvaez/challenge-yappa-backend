// Importo express
import express from "express"

// Utilizo el módulo de morgan para registrar solicitudes HTTP en la consola
import morgan from "morgan"

// Utilizo el módulo de cors para permitir solicitudes de otros dominios
import cors from "cors"

// ##### Importo rutas de la API #####
import client from "./routes/client.routes.js"

// Importo la conexión a la base de datos
import { sequelize } from "./db/config.js"

// Importo el logger
import logger from "./utils/logger.js"

// Importo el módulo de fs para trabajar con el sistema de archivos
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Importo swagger para documentar
import swaggerUI from "swagger-ui-express"
/* const swaggerDocument = require('./swagger.json') */
// Inicializo la aplicación
const app = express()

// Leo el archivo JSON y lo parseo
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const swaggerFilePath = path.join(__dirname, './swagger.json')
const swaggerFile = fs.readFileSync(swaggerFilePath, 'utf8')
const swaggerDocument = JSON.parse(swaggerFile)

// Pruebo conexión a la base de datos
try {
  console.log(sequelize.config)
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

// Configuro el puerto
app.set('port',process.env.PORT || 3000)

// Para que el servidor entienda cors de cualquier origen
/* app.use(cors({
  origin: ['http://localhost:5173','https://yappa-challenge-api.bapps.com.ar'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
})) */
app.use(cors())

app.options('*', cors())
app.use(morgan('dev')) // Mensaje formateado como dev
app.use(express.json()) // Para que el servidor entienda json

// Rutas de la API
// Redirige desde la ruta raíz a /api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs')
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/client',client)

console.log("La documentación de la API está disponible en la ruta /api-docs")

export default app