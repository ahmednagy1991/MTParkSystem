const express = require('express');
const app = express();
const user = require('./routes/user');
const auth = require('./routes/auth');
const park = require('./routes/park');
const soketEmitter = require('./middleware/soketEmitter');
const db = require('mongoose');
const config = require('config');


var SimpleHashTable = require('simple-hashtable');
var clients = new SimpleHashTable();



var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');


    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);





if (config.get("node_envi") == "production") {
    db.connect(config.get("db_host"), { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
        .catch(err => console.log("There is an error while connecting to the databse", err));
}
else {
    db.connect(config.db, { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
        .catch(err => console.log("There is an error while connecting to the databse", err));
}







app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/park', park);

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {

    console.log('user connected');

    socket.on('updatePark', (message, userId) => {
        
        if (userId)
        {
            clients.put(userId, socket.id);
        }
        //
        //console.log("HashTable : "+ clients.get(userId));
        //socket.emit(message);
        io.emit("updateParkList", message);
        //.to(clients.get(userId)) 
        // console.log("Client id : " + clientId);
        console.log("Done");
    });


});








http.listen(process.env.PORT);
