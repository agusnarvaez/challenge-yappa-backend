import winston from 'winston'

const logger = winston.createLogger({
    level: 'info', // Se indica el nivel MÍNIMO de mensajes que serán registrados
    format: winston.format.combine( // formateo de mensajes
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' }, // metadatos adicionales
    transports: [
        //
        // - Escribe todos los logs con nivel `error` en el archivo `error.log`
        // - Escribe todos los logs con nivel `info` en el archivo `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

// Si se está en producción, se agrega un transport adicional para facilitar la depuración en DEV
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }))
}

export default logger