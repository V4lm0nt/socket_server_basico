const express = require('express');

const path = require('path');

require('dotenv').config();

//App de express
const app = express(); 

// Node Server

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./socket/socket.js');

// Mensajes de Sockets
//
//  io.on('connection', client => {
//
//    console.log('Cliente conectado');
//
//    client.on('disconnect', () => { 
//        console.log('Cliente desconecado'); 
//    });
//    
//    client.on('mensaje',()=>{
//        console.log('Mensaje!!')
//
//
//        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
//    });
//
//    
//
//  });


// Path público

const publicPath = path.resolve( __dirname, 'public' );


app.use(express.static(publicPath));

server.listen( process.env.PORT, ( err )=> {
    if ( err ) throw new Error( err );

    console.log('Servidor corriendo en puerto', process.env.PORT);
});