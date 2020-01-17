
//comando para estabelcer la conexion

var socket = io();

socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('desconectado del servidor');
});


//estado actual
socket.on('estadoActual', function (resp) {
    label.text(resp.actual);
})
var label = $('#lblNuevoTicket');

//funcon para ver actualizar el ticket
$('button').on('click', function () {
    console.log('estas dandole click')
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    })
})