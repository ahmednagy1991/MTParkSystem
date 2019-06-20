const Joi = require('joi');


exports.validate = function (usr) {
    const schema = {
        username: Joi.string().required().min(5),
        password: Joi.string().required().min(5),
        email: Joi.string().required().email()
        // phone: Joi.string().required(),
        // address: Joi.string().required().min(5),
        // latitude: Joi.string(),
        // longitude: Joi.string(),
    };
    return Joi.validate(usr, schema);
}



exports.validateLogin = function (usr) {
    const schema = {
        username: Joi.string().required().min(5),
        password: Joi.string().required().min(5),
    };
    return Joi.validate(usr, schema);
}

