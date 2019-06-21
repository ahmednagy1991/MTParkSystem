const express = require('express');
const router = express.Router();
const park = require('../models/park');
const park_schema = require('../requestSchemas/park');
const _ = require('lodash');
const helper = require('../utilities/utilites');
var bodyParser = require('body-parser');
const regTemplate = require('../email_templates/registration_template');
const auth = require('../middleware/auth');
var events = require('events');
var eventEmitter = new events.EventEmitter();
// var events = require('events');
// var eventEmitter = new events.EventEmitter();


router.use(bodyParser.json());


router.post('/checkin', auth, (req, res) => {
    const error = park_schema.validateCheckIn(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);
    req.body.user=req.user._id;
    park.checkin(req.body).then((obj)=>{
        return res.send(_.pick(obj, ["tag_id"]));
    }).catch((err)=>{
        return res.status(400).send(err.errmsg); 
    });
});

router.post('/checkout', auth, (req, res) => {
    const error = park_schema.validateCheckOut(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);
    req.body.user=req.user._id;
    park.checkout(req.body).then((obj) => {
        return res.send("done");
    }).catch((err) => {
        return res.status(400).send(err.errmsg);
    });
});

// router.get('/all', auth, (req, res) => {  
//     park.getAllParks().then((obj) => {
//         return res.send(obj);
//     }).catch((err) => {
//         return res.status(400).send(err.errmsg);
//     });
// });

router.get('/myParks', auth, (req, res) => {
    park.getMyParks(req.user._id).then((obj) => {
        console.log("Loading user parks");
        return res.send(obj);
    }).catch((err) => {
        return res.status(400).send(err.errmsg);
    });
});

router.get('/myVacantParks', auth, (req, res) => {
    park.getVacantParks(req.user._id).then((obj) => {
        console.log("Vacant Parks : ");
        console.log(obj);
        // eventEmitter.emit('updatePark');
        var eventListeners = require('events').EventEmitter.listenerCount
            (eventEmitter, 'connection');
        console.log(eventListeners + " Listner(s) listening to connection event");
        
        return res.send(obj);
    }).catch((err) => {
        return res.status(400).send(err.errmsg);
    });
});




module.exports = router;
