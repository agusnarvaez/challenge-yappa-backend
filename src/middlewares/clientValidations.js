import { check,param,validationResult } from "express-validator"

export const validateGetById = [
    param("id")
        .exists().bail().withMessage("El campo id no existe")
        .isInt().bail().withMessage("El campo id debe ser un valor numérico")
        .not().isEmpty().bail().withMessage("El campo id no debe estar vacío"),
    (req,res,next) => validateResult(req, res, next)
]

export const validateCreate = [
    check("id")
        .optional({nullable: true})
        .isInt().bail().withMessage("El campo id debe ser un valor numérico"),
    check("name")
        .exists().bail().withMessage("El campo name no existe")
        .isString().bail().withMessage("El campo name debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo name no debe estar vacío"),
    check("last_name")
        .exists().bail().withMessage("El campo last_name no existe")
        .isString().bail().withMessage("El campo last_name debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo last_name no debe estar vacío"),
    check("birth_date")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo birth_date no existe")
        .not().isEmpty().bail().withMessage("El campo birth_date no debe estar vacío")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("El campo birth_date debe tener el formato yyyy-mm-dd")
        .custom((value) => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error("El campo birth_date debe ser una fecha válida");
            }
            return true;
        }),
    check("cuit")
        .exists().bail().withMessage("El campo cuit no existe")
        .isString().bail().withMessage("El campo cuit debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo cuit no debe estar vacío")
        .matches(/^\d{2}-\d{8}-\d{1}$/).withMessage("El campo cuit debe tener el formato nn-nnnnnnnn-n"),
    check("address")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo address no existe")
        .isString().bail().withMessage("El campo address debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo address no debe estar vacío"),
    check("phone_number")
        .exists().bail().withMessage("El campo phone_number no existe")
        .isString().bail().withMessage("El campo phone_number debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo phone_number no debe estar vacío"),
    check("email")
        .exists().bail().withMessage("El campo email no existe")
        .isString().bail().withMessage("El campo email debe ser un valor alfanumérico")
        .isEmail().bail().withMessage("El campo email debe ser un email válido")
        .not().isEmpty().bail().withMessage("El campo email no debe estar vacío"),
    (req,res,next) => validateResult(req, res, next)
]

export const validateUpdate = [
    check("name")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo name no existe")
        .isString().bail().withMessage("El campo name debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo name no debe estar vacío"),
    check("last_name")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo last_name no existe")
        .isString().bail().withMessage("El campo last_name debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo last_name no debe estar vacío"),
    check("birth_date")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo birth_date no existe")
        .not().isEmpty().bail().withMessage("El campo birth_date no debe estar vacío")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("El campo birth_date debe tener el formato yyyy-mm-dd")
        .custom((value) => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error("El campo birth_date debe ser una fecha válida");
            }
            return true;
        }),
    check("cuit")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo cuit no existe")
        .isString().bail().withMessage("El campo cuit debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo cuit no debe estar vacío")
        .matches(/^\d{2}-\d{8}-\d{1}$/).withMessage("El campo cuit debe tener el formato nn-nnnnnnnn-n"),
    check("address")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo address no existe")
        .isString().bail().withMessage("El campo address debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo address no debe estar vacío"),
    check("phone_number")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo phone_number no existe")
        .isString().bail().withMessage("El campo phone_number debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El campo phone_number no debe estar vacío"),
    check("email")
        .optional({nullable: true})
        .exists().bail().withMessage("El campo email no existe")
        .isString().bail().withMessage("El campo email debe ser un valor alfanumérico")
        .isEmail().bail().withMessage("El campo email debe ser un email válido")
        .not().isEmpty().bail().withMessage("El campo email no debe estar vacío"),
    (req,res,next) => validateResult(req, res, next)
]

const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        next()
    }catch(err){
        res.status(400).json({errors: err.array()})
    }
}

