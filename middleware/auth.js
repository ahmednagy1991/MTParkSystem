const jwt=require('jsonwebtoken');
const config=require('config');
module.exports=function(req, res, next) {
   
    
    const token = req.header('Authorization');
    if (!token) return  res.status(401).send("Access denied. no token provided");
    try {
        const dcoded_token = jwt.verify(token, "ahmednagy");
        //const dcoded_token = jwt.verify(token, config.get('jwt_private_key'));
        console.log("decoded user : " + dcoded_token);
        req.user = dcoded_token;
        next();
    } catch (ex) {
        return ex;
    }


}