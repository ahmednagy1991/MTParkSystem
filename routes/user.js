const express = require('express');
const router = express.Router();
const user = require('../models/user');
const user_schema = require('../requestSchemas/user');
const _ = require('lodash');
const helper = require('../utilities/utilites');
var bodyParser = require('body-parser');
const regTemplate = require('../email_templates/registration_template');
const auth = require('../middleware/auth');
router.use(bodyParser.json());


router.post('/register', (req, res) => {
    const error = user_schema.validate(req.body);   
    if (error.error) return res.status(400).send(error.error.details[0].message);
    helper.hash_password(req.body.password).then((result) => {       
        req.body.password = result;
        user.Register(req.body).then((new_usr) => {
            //helper.sendEmail(req.body.email, "Park System activatoin link", regTemplate.getTemplate({ "activation_token": new_usr.activation_token }));
            return res.send(_.pick(new_usr, ["username", "email"]));
        }).catch((err) => {
            return res.status(500).send(err);
          
        });
    });
});



router.get('/activate', (req, res) => {
    user.findUserByActivationtoken(req.query.activation_token).then((result) => {
        user.activateUser(result).then((result) => {
            return res.send(_.pick(result, ["_id", "username", "email"]));
        })
    }).catch((err) => {
        return res.status(500).send(err);
    });

});



router.get('/all', auth, (req, res) => {
    user.getAllUsers().then((result) => {
             return res.send(result);
    });
});
   
        // user.getAllUsers().then((result) => {
        //     return res.send(result);
        // }).catch((err) => {
        // return res.status(500).send(err);
        // });
        






module.exports = router;
