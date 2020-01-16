const express = require('express');
//importando el modulo de sochet
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');
const app = express();

let server = http.createServer(app)

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//IO = esta es la comunicacion del backend
//tenemos que mandarle el server creado con http
module.exports.io = socketIO(server);
require('./sockets/socket')


//para ver que todo esta correctamente tenemos que entrar a :
//http://localhost:3000/socket.io/socket.io.js y tiene que darnos un archivo

//para verificar la conexion

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en http://localhost:${port}`);

});