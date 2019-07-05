const jwt = require('jsonwebtoken');
const config = require('config');

var SimpleHashTable = require('simple-hashtable');
var clients = new SimpleHashTable();

module.exports = function (req, res, next) {


    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Access denied. no token provided");
    try {
        const dcoded_token = jwt.verify(token, "ahmednagy");
        //const dcoded_token = jwt.verify(token, config.get('jwt_private_key'));
        console.log("decoded user : " + dcoded_token);
        req.user = dcoded_token;

        // if (ClientId) {
        //     console.log("User Id");
        //     //clients.put(req.user.id, SoketId);
        // }

        next();
    } catch (ex) {
        return ex;
    }


}





module.exports.GetSoketID = function (ClientId) {

}