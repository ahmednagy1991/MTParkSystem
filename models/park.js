const db = require('mongoose');
const uuidv1 = require('uuid/v1');

var moment = require('moment');



const Park = db.model('Park', db.Schema({
    tag_id: {
        type: String,
        required: true,
        unique: true
    },
    car_id:String,
    time_in: Date,
    time_out: Date,
    status:String,
    fees:Number,
    mode: { type: Number, required: true},
    checked_out:Boolean,
    user:{
        type: db.Schema.Types.ObjectId,
        ref:'User'
    }
}));

module.exports.checkin = function (park) {
    let new_park = new Park(park);
    new_park.time_in = moment();
    new_park.time_out="";
    new_park.mode = 1;
    new_park.tag_id = uuidv1();  
    new_park.fees = 0;  


    return new Promise(function (resolve, reject) { 
        new_park = new_park.save((err, obj) => {           
            if (err) {
                 reject(err);
            }
            else {
                 resolve(obj);
            }
        });
    });   
}


function Calculate()
{
    return 145;
}


module.exports.checkout = function (park) {
    return new Promise(function (resolve, reject) {
        
        Park.findOneAndUpdate({ tag_id: park.tag_id,user:park.user },{
            mode: 2, time_out: moment(), tag_id: null, fees: Calculate()
        }).then((obj) => {          
            if (!obj) return reject("Park not found");
            //calculate fees
            resolve(obj);
        }).catch((err)=>{
            reject(err);
        });
    });
}


module.exports.getAllParks = function () {
    return new Promise(function (resolve, reject) {
        Park.find().then((obj) => {
            if (!obj) return reject("No parks found");           
            resolve(obj);
        });
    });
}



module.exports.getMyParks = function (UserID) {
    return new Promise(function (resolve, reject) {
        Park.find({ user: UserID}).then((obj) => {
            if (!obj) return reject("No parks found");
            resolve(obj);
        });
    });
}




