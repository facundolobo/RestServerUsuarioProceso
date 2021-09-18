const validarCampos = require('../middlewares/validar_campos');
const validarJWT = require('../middlewares/validar-jwt');

module.exports = {
    ...validarCampos,
    ...validarJWT,
}