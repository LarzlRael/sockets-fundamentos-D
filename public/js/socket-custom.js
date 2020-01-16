 //evento para ver si esta conectado
 var socket = io();
 socket.on('connect', function () {
     console.log('conectado al servidor')
 });
 //evento para ver si el esta desconectado
 socket.on('disconnect', function () {
     console.log('perdimos conexion con el servidor')
 });
 // los emits son para enviar informacon
 // los on sirven para escuhar informacion
 socket.emit('enviarMensaje', {
     usuario: 'rey',
     mensaje: 'hola mundo'
 }, function (resp) {  //en resp esta el objeto donde esta el estado
     console.log('respuesta server :', resp)
 });

 //escuchar infomacion desde el servidor
 socket.on('enviarMensaje', function (mensaje) {
     console.log('servidor', mensaje)
 })