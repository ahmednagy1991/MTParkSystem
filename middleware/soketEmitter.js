

const http = require('http').Server(app);
const io = require('socket.io')(http);


module.exports = function (req, res, next) {

   


    io.on('connection', socket => {

        console.log('user connected');

        socket.on('updatePark', (message) => {
            //let clientId = socket.id;
            socket.emit(message);
            io.emit("updateParkList", message);
            // console.log("Client id : " + clientId);
            console.log("Done");
        });


    });

    next();

}