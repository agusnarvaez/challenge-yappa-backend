// Importaciones de paquetes
import express from "express"
const router = express.Router()

// Validations
import { validateGetById,validateCreate,validateUpdate } from "../middlewares/clientValidations.js"

// Controllers
import clientController from "../controllers/clientController.js"

router.get('/',clientController.getAll)
router.get('/:id',validateGetById,clientController.getById)
router.post('/',validateCreate,clientController.insert)
router.patch('/:id',validateGetById,validateUpdate, clientController.update)
router.delete('/:id',validateGetById,clientController.delete)

export default router