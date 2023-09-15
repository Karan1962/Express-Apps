const express= require("express");
const bodyParser = require("body-parser")
const https= require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){

   const query=req.body.cityName;
   const appid="de1c6a322b85a0eff6cd2a40ff53db16";
   const units= "metric";
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+appid;

   https.get(url, function(response){
       console.log(response.statusCode )
       response.on("data" ,function(data){
           const weatherData= JSON.parse(data);
           const description= weatherData.weather[0].description;
           const temp= weatherData.main.temp;
           const img = weatherData.weather[0].icon;
           const imageUrl= " https://openweathermap.org/img/wn/"+img+ ".png "
           res.write("<p>The weather is currently " + description + "</p>")
           res.write("<h1>The temperature in "+query+ " is " + temp + " degrees celcius.</h1>")
           res.write("<img src="+imageUrl+">");

    })
  })
})


app.listen(3000, function(){
    console.log("Server is running on port 3000." )
})
