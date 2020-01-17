//para este ejemplo vamos a usar clases
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        //funcion para obtener solo el dia actual
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }
    }

    //este metodo solo tiene que incrementar en 1 
    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        //añadir este ticket a nuestro arreglo de ticjet
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        //elimina la primero posicion del arriblo
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            //borra el ultimo elemento del arreglo de ultimos 4
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4 : ');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }




    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.grabarArchivo();
        this.ultimos4 = [];

    }

    grabarArchivo() {
        let jsonDatA = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        //funcion para convertir a un json perfecto
        let jsonDataString = JSON.stringify(jsonDatA);
        //para escribir los datos en nuestro archivo (que simula una base de datos)
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        //console.log('se ha inicicializado el sistema')
    }
}

module.exports = {
    TicketControl
}