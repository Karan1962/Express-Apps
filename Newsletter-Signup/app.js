

const express = require("express");
const bodyParser = require ("body-parser");
const request = require ( "request");
const https = require("https");
const env = require("dotenv")
const apiKey=process.env.API_KEY;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.get("/success",function(req,res){
  res.sendFile(__dirname+"/success.html")
})

app.post("/" , function(req , res){

    const firstName =req.body.fName;
    const lastName =req.body.lName;
    const email=req.body.EMAIL;
    const data={
      members:[{
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName,
        }

      
      }],
    }

    const jsonData = JSON.stringify(data);

    const options = {
      method: "POST",
      auth: `karan:${apiKey}`
    }

    const url= "https://us9.api.mailchimp.com/3.0/lists/57489aee41" 

    const request= https.request(url, options, function(response){
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })

    })

    request.write(jsonData);
    request.end();
    res.redirect("/success")
});

app.listen(3000, function(){
    console.log("server is running on port 3000")
});


// appid:e2407239a7e3d3c3b2f51fa49ecefc90-us9
// {
//   "name": "$event_name",
//   "contact": $footer_contact_info,
//   "permission_reminder": "permission_reminder",
//   "email_type_option": true,
//   "campaign_defaults": $campaign_defaults
// }

//  af67b0edb7ba3c3fbe1235fef6806b8f-us9
//  57489aee41
/* <label for="floatingEmail">Email</label><label for="floatingInput">First name</label> */
