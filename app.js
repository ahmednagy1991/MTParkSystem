const express=require('express');
const app=express();
const user = require('./routes/user');
const auth = require('./routes/auth');
const park = require('./routes/park');
const anony = require('./middleware/anonyms');
const db = require('mongoose');
const config = require('config');
var cors = require('cors');

app.options(cors());


// app.use(cors());
//://cloud.mongodb.com


// db.connect(config.get("db_host")).then(() => console.log("connected to databse successfuly"))
//     .catch(err => console.log("ther is an error while connecting to the databse", err));
//console.log(config.db);



if (config.get("node_envi") == "production")
{
    db.connect(config.get("db_host"), { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
        .catch(err => console.log("There is an error while connecting to the databse", err));
}
else
{
    db.connect(config.db, { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("connected to databse successfuly"))
        .catch(err => console.log("There is an error while connecting to the databse", err));
}



//app.use(anony);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/park', park);

console.log(config.application_url);

  




const port = config.get("NODE_PORT");
app.listen(process.env.PORT,()=>{  
    console.log(`working on port ${process.env.PORT}`);
});