const { Router } = require('express');

//helpers
const { 
    existeProcesoPorId, 
    procesoExiste, 
} = require('../helpers');

//middlewares
const { 
    validarJWT,
    validarCampos 
} = require('../middlewares');

//controlador
const { 
    obtenerProcesos,
    actualizarProceso,
    procesosDelete,
    obtenerProceso,
    crearProceso, 
} = require('../controllers');


const { check } = require('express-validator');




const router = Router();


/**
 * {{url}}/proceso
 */

// Crear Producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,//validar el token
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom( procesoExiste ),
    check('duracion', 'El duracion es obligatorio').not().isEmpty(),    
    check('duracion').isNumeric(),
    check('llegada', 'El llegada es obligatorio').not().isEmpty(),
    check('llegada').isNumeric(),
     
    validarCampos //al final para validar los campos
],crearProceso)


// Obtener todos los Procesos - provado
router.get('/',[
    validarJWT,
], obtenerProcesos )


// Obtener un Proceso por id - publico
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProcesoPorId ),
    validarCampos //al final para validar los campos
], obtenerProceso )

// Actualizar - privado - cualquier persona con un token válido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProcesoPorId ),
    validarCampos //al final para validar los campos
], actualizarProceso)

// // Borrar un Procesos - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProcesoPorId ),
    validarCampos //al final para validar los campos
], procesosDelete)


module.exports = router;