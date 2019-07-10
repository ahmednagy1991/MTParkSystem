const express = require('express');
const router = express.Router();
const user = require('../models/user');
const _ = require('lodash');
const auth_scehma=require('../requestSchemas/auth');
const helper = require('../utilities/utilites');


var bodyParser = require('body-parser');
router.use(bodyParser.json());




router.post('/login', (req, res) => {
    const error = auth_scehma.validate(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);
    user.findUserByUsername(req.body.username).then((result) => {
        helper.compare_password(req.body.password, result.password).then((valid) => {
            if (valid) {
                helper.generateToken(_.pick(result, ["_id", "username", "email"])).then((token) => {
                    console.log("token : "+token);
                    return res.header('x-auth-token', token).send({ "token": token, "user": _.pick(result, ["_id", "username", "email","role"])});
                }).catch((err) => {
                    return res.status(200).json({ Message: err });
                });
            }
            else {
                return res.status(200).json({ Message: err });
            }
        }).catch((err) => {
            return res.status(200).json({ Message: err });
        });
    }).catch((err) => {
        return res.status(200).json({ Message: err });
    });
});


module.exports = router;
