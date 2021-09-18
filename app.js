require('dotenv').config();//para la configuraciond e usar variables de entorno

const Server = require('./models/server'); 
// creamos una clase de nuestro servidor

const server = new Server();

server.listen(); //al final de todo arrancamos el servidor
 
