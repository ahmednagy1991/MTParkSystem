
var ut = require("../utilities/utilites")
const park = require('../models/park');
const park_schema = require('../requestSchemas/park');
const _ = require('lodash');
var soket_list = require("node-hashtable");
const park_emitter = require('../Emitters/parkEmitters');
// hashtable.put('key', { value: 'value' });


exports = module.exports = function (io) {

    io.on('connection', socket => {
        if (socket.handshake.query["authorization"]) {
            var usr = ut.decode_token(socket.handshake.query["authorization"]);
            soket_list.set(usr._id, socket.id)
        }

        console.log('user connected : ' + socket.id);

        socket.on('updatePark', (body) => {
            const error = park_schema.validateCheckIn(body);
            if (error.error) return res.status(400).send(error.error.details[0].message);
            body.user = usr._id;
            park.checkin(body).then((obj) => {
                park.getVacantParks(usr._id).then((resul_object) => {
                    socket.emit("updateParkList", resul_object);
                });
            }).catch((err) => {
            });
        });




        socket.on('checkout', (user_id) => {
            park.getVacantParks(user_id).then((resul_object) => {
                console.log(`${soket_list.get(user_id)}`);
                io.to(`${soket_list.get(user_id)}`).emit("updateParkList", resul_object);
            });           
        });


        socket.on('SetPickupRequest', (body) => {
            body.user = usr._id;
            park.SetPickupRequest(body).then((resul_object) => {
                park.getVacantParks(usr._id).then((resul_object) => {
                    park.getVacantParks(usr._id).then((resul_object) => {
                        socket.emit("updateParkList", resul_object);
                    });
                });
              
            });
        });


        socket.on('SetOut', (body) => {
            body.user = usr._id;
            park.SetOut(body).then((resul_object) => {
                console.log("set to time out");
                park.getVacantParks(usr._id).then((resul_object) => {
                    park.getVacantParks(usr._id).then((resul_object) => {
                        socket.emit("updateParkList", resul_object);
                    });
                });

            });
        });
        

    });


}



