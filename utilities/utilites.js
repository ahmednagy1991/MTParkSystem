const crypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('config');
var nodemailer = require('nodemailer');


exports.hash_password = function (password) {

    return new Promise(function (resolve, reject) {

        crypt.genSalt(10, function (error, salt) {
            crypt.hash(password, salt, null, function (err, hash) {
                if (err) {
                     return reject(err);
                }
                else {
                   return resolve(hash);
                }
            });
        });

    });
   

}


exports.compare_password = async function (password, crypt_password) {
    try {
        return await crypt.compare(password, crypt_password);
    } catch (err) {
        return err
    }

}



exports.generateToken = async function (obj) {
    try {
        return await jwt.sign(obj, config.get("jwt_private_key"));
    } catch (err) {
        res.status(400).send("Jwt private key not found")
    }
}



exports.sendEmail = async function (reciver, subject, html_template) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.get("smtp_username"),
            pass: config.get("smtp_password")
        }
    });

    var mailOptions = {
        from: config.get("smtp_username"),
        to: reciver,
        subject: subject,
        html: html_template
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}