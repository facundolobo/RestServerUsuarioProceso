const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login',[
    check('correo', 'El correo no es válido').isEmail(), //middleware (se ejecutan antes de otra cosa) crea un registro 
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos //al final para validar los campos

] ,login );

// router.post('/google',[
//     check('id_token', 'El id_token es necesario').not().isEmpty(), //middleware (se ejecutan antes de otra cosa) crea un registro 
//     validarCampos
// ] ,googleSingin );


module.exports = router;