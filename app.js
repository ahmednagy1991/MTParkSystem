const express = require('express');
const app = express();
const user = require('./routes/user');
const auth = require('./routes/auth');
const park = require('./routes/park');
// //const soketEmitter = require('./middleware/soketEmitter');
// const SoketClients = require('./middleware/ClientSokets');
const db = require('mongoose');
const config = require('config');






var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');


    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);






// if (config.get("node_envi") == "production") {
//     db.connect(config.get("db_host"), { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
//         .catch(err => console.log("There is an error while connecting to the databse", err));
// }
// else {
//     db.connect(config.db, { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
//         .catch(err => console.log("There is an error while connecting to the databse", err));
// }


//from env
db.connect("mongodb+srv://ahmednagy:Ahmed1991@cluster0-5p48n.mongodb.net/test", { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
    .catch(err => console.log("There is an error while connecting to the databse", err));




//



app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/park', park);

const http = require('http').Server(app);
const io = require('socket.io')(http);
var sokets=require("./soket_events/ParkSoketEvents")(io);







//from env
// http.listen(process.env.PORT);
// console.log("working on http://localhost:" + process.env.PORT);

http.listen(3000);
console.log("working on http://localhost:" + 3000);
