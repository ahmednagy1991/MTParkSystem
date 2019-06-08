
const Joi = require('joi');
exports.validate = function (part) {
    const schema = {
        password: Joi.string().required().min(5),
        email: Joi.string().required().email(),
    };
    return Joi.validate(part, schema);
}
