const {Schema, model} = require('mongoose');

const ProcesoSchema = Schema({
    usuario:{
        type: Schema.Types.ObjectId , //debe enviar un id de usuario para saber quien lo creo
        ref: 'Usuario',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    duracion: {
        type: Number,
        required: [true, 'La duracion es obligatoria'],
      
    },

    llegada: {
        type: Number,
        required: [true, 'La llegada es obligatoria']
    },
    prioridad: {
        type: Number,
        required: true,
        default: 0
    },

})
//funcion para extraer y quitar los atributos q no quiero q se devuelvan 
ProcesoSchema.methods.toJSON = function(){
    const {__v, _id, ...proceso} = this.toObject();    
    
    //cambiar nombre de variable id 
    
    proceso.id= _id;
    //--

    return proceso;
}


module.exports = model('Proceso' , ProcesoSchema)