const { io } = require('../server')
//para ver que todo esta correctamente tenemos que entrar a :
//http://localhost:3000/socket.io/socket.io.js y tiene que darnos un archivo

//para verificar la conexion
io.on('connection', (client) => {
    console.log('usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'administrador',
        mensaje: 'bienvenido a esta aplicacion',
        desde: 'pues desde socket puerco'
    })


    //detectar si un usuario esta contectado del lado del cliente
    client.on('disconnect', () => {
        console.log('Usuario desconectado')
    });
    //Escuchar al cliente (el enviarMensaje tiene que ser el mismo que el front)
    // el callback es lo que queremos hacer cuando todo salio bien
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);
        client.broadcast.emit('enviarMensaje', data);
        // if (mensaje.usuario) {
        //     callback({
        //         res: 'todo salio bien'
        //     })
        // } else {
        //     callback({
        //         res: 'todo salio mal !!!!!!!!'
        //     })
        // }
    })
});