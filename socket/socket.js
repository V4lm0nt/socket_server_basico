const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();

bands.addBand(new Band('Led Zeppelin'));
bands.addBand(new Band('The Doors'));
bands.addBand(new Band('Black Sabbath'));
bands.addBand(new Band('Pink Floyd'));
bands.addBand(new Band('Bob Dylan'));



//console.log(bands); //muestra todas las bandas que hardcodee arriba

// Mensajes de Sockets

io.on('connection', client => {

    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { 
        console.log('Cliente desconecado'); 
    });
    
    client.on('mensaje',()=>{
        console.log('Mensaje!!')

        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    });

    //client.on('emitir-mensaje', ( payload )=>{
    //    client.broadcast.emit('nuevo-mensaje', payload);
    //  //  console.log(payload);
    //});
    
    client.on('vote-band', ( payload )=>{
        console.log(payload.id);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        
    });

    client.on('add-band', ( payload )=>{
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', ( payload )=>{
        
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        
    });

    

});