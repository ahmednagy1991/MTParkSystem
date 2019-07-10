const db = require('mongoose');



const Role = db.model('Role', db.Schema({
    role_name: String,
}));




module.exports.seed_roles = function () {
   
    
    Role.count({})
        .then(number => {
            if (number>0)
            {
                var admin = new Role({ role_name:"Admin"});
                admin.save(function (err) {
                  let tt=2
                    
                });

                // var sub_admin = new Role({ role_name: "Sub Admin" });
                // sub_admin.save();

                // var hotel = new Role({ role_name: "Hotel" });
                // hotel.save();
    
             
            }
        });

   
  
}








