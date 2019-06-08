const db = require('mongoose');
const uuidv1 = require('uuid/v1');



const User = db.model('User', db.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: String,
    longitude: String,
    avg_rate: Number,
    is_active: Boolean,
    activation_token: String,
    created_at: { type: String, default: Date.now() }
}));



module.exports.Register = function (newuser) {
    return new Promise(function (resolve, reject) {       
        User.findOne({ email: newuser.email }).then((usr) => {
            if (usr) return reject("User already exisits");
            let new_user = new User(newuser);
            new_user.is_active = false;
            new_user.activation_token = uuidv1();
            new_user = new_user.save((err, obj) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(obj);
                }
            });
        });
    });
}


module.exports.findUserByMail = function (mail) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: mail }).then((usr) => {
            if (!usr) return reject("Invalid username or password");
            resolve(usr);
        });
    });
}


module.exports.findUserByActivationtoken = function (token) {
    return new Promise(function (resolve, reject) {
        User.findOne({ activation_token: token }).then((usr) => {
            if (!usr) return reject("Invalid activation token");
            resolve(usr);
        });
    });
}


module.exports.activateUser = function (newuser) {
    return new Promise(function (resolve, reject) {
        newuser.is_active=true;
        newuser.activation_token="";
        User.findByIdAndUpdate(newuser._id, newuser).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}


