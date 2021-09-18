const express         = require('express')
const cors            = require('cors');
const { dbConection } = require('../database/config');
 


class Server {
    
    constructor(){
        // const app = express()
        this.app = express();
        this.port = process.env.PORT; //definimos el puerto obtenido de env

        this.paths = {
            auth:     '/auth',
            usuarios: '/usuarios',
            procesos: '/procesos'
            
        }

        //conectar a la base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes(); //agregamos als rutas
        
    }


    //base de datos 
    async conectarDB(){
        await dbConection();
    }


    //middlewares
    middlewares(){

        // CORS
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'));

    }

    //rutas 
    routes(){

        // es un middleware condicional, si se solicita algo en esa dirrecion lo envia hacia router
        this.app.use(this.paths.usuarios, require('../routers/usuarios'));
        this.app.use(this.paths.procesos, require('../routers/procesos'));
        this.app.use(this.paths.auth,     require('../routers/auth'));


    }


    //metdo para arrancar el servidor en un puerto
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor correindo en puerto', this.port );
        })
    }
}

module.exports = Server;