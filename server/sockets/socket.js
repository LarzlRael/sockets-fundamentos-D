const { io } = require('../server')
//para ver que todo esta correctamente tenemos que entrar a :
//http://localhost:3000/socket.io/socket.io.js y tiene que darnos un archivo

const { TicketControl } = require('../classes/Ticket-control');
const tikenControl = new TicketControl();


//para verificar la conexion
io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = tikenControl.siguiente();

        console.log(`siguiente : ` + siguiente)
        callback(siguiente);
    });

    //emitir un evento llamado estado actual
    client.emit('estadoActual', {
        actual: tikenControl.getUltimoTicket(),
        ultimos4:tikenControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es nesesario'
            })
        };

        let atenderTicket = tikenControl.atenderTicket(data.escritorio)

        callback(atenderTicket);
        // actualizar y notificar en los ultimos 4
        
        client.broadcast.emit('ultimos4',{
            ultimos4: tikenControl.getUltimos4()
        });
    })
});;