// var events = require('events');
// var eventEmitter = new events.EventEmitter();

const client_io = require('socket.io-client');
//from env
const client_socket = client_io.connect('http://localhost:' + 3000, {
    reconnect: true
});

// const client_socket = client_io.connect('http://localhost:' + process.env.PORT, {
//     reconnect: true
// });

client_socket.on('connect', function (socket) {

    console.log('Connected to the server! on soket id : ' + socket);
});

// var update_parks = function updateParks() {

// }

// eventEmitter.addListener('updatePark', update_parks);

module.exports.update_parks = function (userId) {
    client_socket.emit('checkout', userId);
}