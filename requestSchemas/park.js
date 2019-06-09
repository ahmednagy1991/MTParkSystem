const Joi = require('joi');


exports.validateCheckIn = function (park) {
    const schema = {
         car_id: Joi.string().required()      
    };
    return Joi.validate(park, schema);
}

exports.validateCheckOut = function (park) {
    const schema = {
         tag_id: Joi.string()      
    };
    return Joi.validate(park, schema);
}