const db = require('mongoose');
const uuidv1 = require('uuid/v1');



const Gate = db.model('Gate', db.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    latitude: String,
    longitude: String,   
    is_active: Boolean
}));

module.exports.GetAllGates = function () {
    return new Promise(function (resolve, reject) {
        Gate.find().then((usr) => {
            if (!usr) return reject("No avilable gates");
            resolve(usr);
        });
    });
}




