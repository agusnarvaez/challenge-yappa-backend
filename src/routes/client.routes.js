// Importaciones de paquetes
import express from "express"
const router = express.Router()

// Controllers
import clientController from "../controllers/clientController.js"

router.get('/',clientController.getAll)
router.get('/:id',clientController.getById)
router.get('/search/:name',clientController.searchOne)
router.post('/',clientController.insert)
router.patch('/:id',clientController.update)
router.delete('/:id',clientController.delete)

export default router