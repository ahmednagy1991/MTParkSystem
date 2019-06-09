
const Joi = require('joi');
exports.validate = function (part) {
    const schema = {
        password: Joi.string().required().min(5),
        username: Joi.string().required(),
    };
    return Joi.validate(part, schema);
}
