const crypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('config');
var nodemailer = require('nodemailer');






exports.decode_token = function (token) {    
    if (!token) return res.status(401).send("Access denied. no token provided");
    try {
        const dcoded_token = jwt.verify(token, "ahmednagy");
        //const dcoded_token = jwt.verify(token, config.get('jwt_private_key'));
        return  dcoded_token;
      
    } catch (ex) {
        return ex;
    }

}




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
        //form env
        return await jwt.sign(obj, "ahmednagy");
        // return await jwt.sign(obj, config.get("jwt_private_key"));
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