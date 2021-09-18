const { Router } = require('express');
const { check } = require('express-validator');

//helpers
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
} = require('../helpers')

//middlewares
const {
    validarCampos, validarJWT
} = require('../middlewares')

//controlador
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch, 
    usuariosDelete } = require('../controllers/usuarios');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//cada una de las rutas

router.get('/', usuariosGet );

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        validarJWT,
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRoleValido ), // es lo mismo (rol) => esRoleValido(rol) //es una valdiacion hecha por mi
        check('correo').custom( emailExiste ), //middleware (se ejecutan antes de otra cosa) crea un registro 
        
        validarCampos //al final para validar los campos
 
], usuariosPut); //":id" es para obtener el valor enviado desde la url

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min:6 }),
        check('correo', 'El correo no es válido').isEmail(), //middleware (se ejecutan antes de otra cosa) crea un registro 
        
        check('correo').custom( emailExiste ), //middleware (se ejecutan antes de otra cosa) crea un registro 
        
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRoleValido ), // es lo mismo (rol) => esRoleValido(rol) //es una valdiacion hecha por mi
        validarCampos //al final para validar los campos

], usuariosPost);

router.delete('/:id',[
        validarJWT,
        esAdminRole,
        // tieneRole('ADMIN_ROLE','VENTAS_ROLE', 'OTRO_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

//------------------

module.exports = router;