const { validationResult } = require("express-validator")

//middlewares para validacion de campos
const validarCampos = (req, res, next)=>{
    const errors = validationResult(req) //obtenemos el registro de un middleware

    if (!errors.isEmpty()){
        return res.status(400).json(errors) //enviamos los errores
    }

    next(); //para seguir con el siguiente middleware
}

module.exports ={
    validarCampos
}