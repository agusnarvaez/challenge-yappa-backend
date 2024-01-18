import { query } from 'express'
import {Client} from '../db/models/client.js'

import {Op} from 'sequelize'
import logger from '../utils/logger.js'
const controller = {
    getAll: async (req, res) => {
        let name = req.query.name
        let last_name = req.query.last_name
        let cuit = req.query.cuit
        try{
            let queryOptions = {}
            if (name) queryOptions.where = {
                name: {
                    [Op.like]: `%${name}%`,
                }
            }
            if (last_name) queryOptions.where = {
                ...queryOptions.where,
                last_name: {
                    [Op.like]: `%${last_name}%`,
                }
            }
            if (cuit) queryOptions.where = {
                ...queryOptions.where,
                cuit: {
                    [Op.like]: `%${cuit}%`,
                }
            }

            const clients = await Client.findAll(queryOptions)

            if (clients.length == 0){
                return res.status(404).json({
                    message: "No se encontraron clientes"
                })
            }

            return res.status(200).json({
                message: "Operación exitosa",
                data: clients
            })
        }
        catch(error){
            const errorDetails = {
                timestamp: new Date().toISOString(), // Hora del error
                endpoint: req.originalUrl,           // Endpoint llamado
                method: req.method,                  // Método HTTP
                errorMessage: error.message          // Mensaje de error
            }
            console.error("Error details:", errorDetails) // Registra los detalles del error
            logger.error(errorDetails)
            return res.status(500).json({ message: "Ocurrió un error interno en el servidor"})
        }
    },
    getById: async (req, res) => {
        let id = req.params.id

        try{
            const client = await Client.findByPk(id)
            if(!client){
                return res.status(404)
                    .json({
                        message: "No se encontró el cliente"
                    })
            }

            return res.status(200)
                .json({
                    message: "Operación exitosa",
                    data: client
                })
        }
        catch(error){
            const errorDetails = {
                timestamp: new Date().toISOString(), // Hora del error
                endpoint: req.originalUrl,           // Endpoint llamado
                method: req.method,                  // Método HTTP
                id: id,                              // Información del ID del cliente
                errorMessage: error.message          // Mensaje de error
            }
            console.error("Error details:", errorDetails) // Registra los detalles del error
            logger.error(errorDetails)
            return res.status(500).json({ message: "Ocurrió un error interno en el servidor"})
        }
    },
    insert: async (req, res) => {
        let {
            name,
            last_name,
            birth_date,
            cuit,
            address,
            phone_number,
            email
        } = req.body

        try {
            // Insertar cliente
            const client = await Client.create({
                name: name,
                last_name: last_name,
                birth_date: birth_date,
                cuit: cuit,
                address: address,
                phone_number: phone_number,
                email: email
            })
            return res.status(201).json({
                message: "Cliente creado",
                data: client })

        } catch (error) {
            const errorDetails = {
                timestamp: new Date().toISOString(), // Hora del error
                endpoint: req.originalUrl,           // Endpoint llamado
                method: req.method,                  // Método HTTP
                body: req.body,                      // Información del cuerpo de la solicitud
                errorMessage: error.message          // Mensaje de error
            }
            console.error("Error details:", errorDetails) // Registra los detalles del error
            logger.error(errorDetails)
            return res.status(500).json({ message: "Ocurrió un error interno en el servidor"})
        }
    },
    update: async (req, res) => {
        let id = req.params.id
        let {
            name,
            last_name,
            birth_date,
            cuit,
            address,
            phone_number,
            email
        } = req.body

        try {
            // Verifica si existe el cliente
            const client = await Client.findByPk(id)
            if (!client) {
                return res.status(404).json({ message: `El cliente con ID ${id} no se encontró` })
            }
            // Actualiza el cliente solo los datos que se envían
            await client.update({
                name: name,
                last_name: last_name,
                birth_date: birth_date,
                cuit: cuit,
                address: address,
                phone_number: phone_number,
                email: email
            })
            return res.status(200).json({
                message: "Cliente actualizado",
                data: client
            })

        } catch (error) {
            const errorDetails = {
                timestamp: new Date().toISOString(), // Hora del error
                endpoint: req.originalUrl,           // Endpoint llamado
                method: req.method,                  // Método HTTP
                body: req.body,                      // Información del cuerpo de la solicitud
                id: id,                              // Información del ID del cliente
                errorMessage: error.message          // Mensaje de error
            }
            console.error("Error details:", errorDetails) // Registra los detalles del error
            logger.error(errorDetails)
            return res.status(500).json({ message: "Ocurrió un error interno en el servidor"})
        }
    },
    delete: async (req, res) => {
        let id = req.params.id

        try{
            // Verifica si existe el cliente
            const client = await Client.findByPk(id)
            if (!client) {
                return res.status(404).json({ message: `El cliente con ID ${id} no se encontró` })
            }
            // Elimina el cliente
            await client.destroy()
            return res.status(200).json({ message: `Cliente con ID ${id} eliminado` })
        }
        catch(error){
            const errorDetails = {
                timestamp: new Date().toISOString(), // Hora del error
                endpoint: req.originalUrl,           // Endpoint llamado
                method: req.method,                  // Método HTTP
                id: id,                              // Información del ID del cliente
                errorMessage: error.message          // Mensaje de error
            }
            console.error("Error details:", errorDetails) // Registra los detalles del error
            logger.error(errorDetails)
            return res.status(500).json({ message: "Ocurrió un error interno en el servidor"})
        }
    }
}

export default controller