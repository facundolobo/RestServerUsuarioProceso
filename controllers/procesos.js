const { response, request } = require('express');



//Modelos
const {
    Proceso
} = require('../models'); //importo el mdoelo



const crearProceso = async(req=request, res = response) => {


    const {nombre, duracion, llegada, prioridad} = req.body; //obtenemos los datos que se envian    
    const usuario = req.usuario._id //obtenemos el usuario obtenido de validacionjwt 


    const proceso = new Proceso({ usuario ,nombre, duracion, llegada, prioridad }); //creo una instacia de mi modelo usuario

    // //guadar en BD
    await proceso.save();

    res.json({
        proceso 
    })
}

const obtenerProcesos = async(req = request, res = response) => {
    
    //esto me permite mandar un arreglo con todas las promesas que quiero q se ejecuten
    const usuario = req.usuario._id; //obtenemos el usuario
    console.log(usuario);
    const [ total, procesos] = await Promise.all([
        Proceso.countDocuments({usuario}),
        Proceso.find({usuario}) //buscamos solo los procesos q le pertenecen al usuairo  del Token
    ]);

    res.json({
        total,
        procesos
    })
}

const obtenerProceso = async(req = request, res = response) => {
    const { id } = req.params; //obenemos el id enviado desde url
    const usuario = req.usuario._id; //obtenemos el usuario
    
    // const proceso = await Proceso.findById(id) //verificamos si ya existe " .populate('usuario', 'nombre')"
 
    const proceso = await Proceso.find({_id:id, usuario})

    if (proceso){

        res.json(
            proceso        
        )
    }else{
        res.json(
            msg = "no se encontro nada"        
        )
    }

    
}


const actualizarProceso = async(req, res = response) => {
    
    const { id } = req.params; //obenemos el id enviado desde url
    const { _id, ...resto } = req.body;

    const proceso = await Proceso.findByIdAndUpdate( id, resto , {new: true});

    res.json({
        proceso
    })
}

const procesosDelete = async(req, res = response) => {
    const { id } = req.params;

    
    //Fisicamente lo borramos
    const proceso = await Proceso.findByIdAndDelete(id);

    //borrar logicamente
    // const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    // const usuarioAutenticado = req.usuario;  //obtenemos los datos de req

    res.json({
        proceso 
    })
}


module.exports={
    crearProceso,
    obtenerProcesos,
    actualizarProceso,
    procesosDelete,
    obtenerProceso
}