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
        type: String
      
    },
    address: {
        type: String       
    },
    latitude: String,
    longitude: String,
    is_super_admin: Boolean,
    fees: { type: Number, required: true} ,
    free_member: {
        type: Boolean, required: true
    },
    is_active: { type: Boolean, default:true},
    activation_token: String,
    created_at: { type: String, default: Date.now() },
    role: {
        type: db.Schema.Types.ObjectId,
        ref: 'Role'
    },
    parent_user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User'
    }
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


module.exports.findUserByUsername = function (mail) {
    return new Promise(function (resolve, reject) {
        User.findOne({ username: mail }).then((usr) => {
            if (!usr) return reject("Invalid username or password");
            resolve(usr);
        });
    });
}



module.exports.findUserById = function (id) {
    return new Promise(function (resolve, reject) {
        User.findOne({ _id: id }).then((usr) => {
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



module.exports.getAllUsers = function () {
    return new Promise(function (resolve, reject) {       
        User.find().then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}




module.exports.updateUser = function (body) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate({ _id: body._id },body).then((usr) => {
            if (!usr) return reject("Invalid username or password");
            resolve(usr);
        });
    });
}