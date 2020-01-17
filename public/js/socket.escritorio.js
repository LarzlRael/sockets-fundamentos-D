
// comando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

var label = $('small');
var h4 = $('h4');
console.log(searchParams);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
// para obtener el parametro del escritorio
var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function () {
    //esta funcion es ṕara poder reproducion un pequeño audio al llamnar al siguiente
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();   
    socket.emit('atenderTicket', { escritorio: escritorio }, function (res) {
        console.log(res)
        if (res === 'No hay tickets') {
            alert(res);
            $('h4').text(res);
            return;
        }
        $('h4').text(`Ticket ${res.numero}`);
    })
})