var emailTemplateBuilder = require("email-template-builder");
const config = require("config");

module.exports.getTemplate = function (obj)
{
    
    var templateConfig = {
        title: "",
        width: 600,
        children: [
            {
                type: "container",
                settings: [{ backgroundColor: "black", color: "white" }],
                children: [
                    {
                        type: "text",
                        value: `To activate your account  <a href=${config.get("app_url")}'/api/user/activate?activation_token={{activation_token}}'>Click here</a> `
                    }
                ]
            }
        ]
    };


    var template = emailTemplateBuilder.generate(templateConfig);  
    return emailTemplateBuilder.generate(obj, template)
}