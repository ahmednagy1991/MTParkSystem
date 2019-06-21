const express=require('express');
const app=express();
const user = require('./routes/user');
const auth = require('./routes/auth');
const park = require('./routes/park');
//const anony = require('./middleware/anonyms');
const db = require('mongoose');
const config = require('config');



//var cors = require('cors');
//app.options(cors());
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Headers', 'x-user-auth');
//     res.setHeader('Cache-Control', 'no-cache');

//     // Pass to next layer of middleware
//     next();
// });

// app.use(cors());
//://cloud.mongodb.com


// db.connect(config.get("db_host")).then(() => console.log("connected to databse successfuly"))
//     .catch(err => console.log("ther is an error while connecting to the databse", err));
//console.log(config.db);


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);





if (config.get("node_envi") == "production")
{
    db.connect(config.get("db_host"), { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
        .catch(err => console.log("There is an error while connecting to the databse", err));
}
else
{
    db.connect(config.db, { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
        .catch(err => console.log("There is an error while connecting to the databse", err));
}



//app.use(anony);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/park', park);

// console.log(config.application_url);

  




// const port = config.get("NODE_PORT");

const http = require('http').Server(app);
const io = require('socket.io')(http);
// io.on('connection', function (socket)  { 
//     socket.broadcast.emit('hi');
//     console.log(`working on port ${process.env.PORT}`);
// });

io.on('connection', socket => {
    console.log('user connected');
    
    socket.on('updatePark', (message) => {
        console.log("Message from Client : "+message);
        let clientId = socket.id;

        console.log("Client id : "+clientId);
        socket.emit(message);
       
    });

    io.emit("updatePark2","test");
});

// client.on('create', (data) => {
//     console.log("Client has been created successfully");
//     io.emit('updatePark', 'this will result in an infinite loop of "create" events!');
// });
http.listen(process.env.PORT);





// app.listen(process.env.PORT,()=>{  
//     console.log(`working on port ${process.env.PORT}`);
// });

