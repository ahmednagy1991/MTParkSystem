function log(req,res,next){
    console.log(req.body);
    next();
};

module.exports=log