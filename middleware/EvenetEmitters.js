
var events = require('events');
var eventEmitter = new events.EventEmitter();

const client_io = require('socket.io-client');
const client_socket = client_io.connect('http://localhost:' + process.env.PORT, {
    reconnect: true
});



module.exports = function (req, res, next) {

    client_socket.on('connect', function (socket) {
        console.log('Connected to the server!');
    });

    client_socket.emit('updatePark', 'Hi from the client side!'); 

    next();

}