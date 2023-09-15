const express= require("express");
const bodyParser= require("body-parser");
const app = express();

var items = [];
var items_2 = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

app.get("/", function(req, res){

    var today = new Date();

    var options = { weekday: 'long', month: 'long', day: 'numeric' };

    var day = today.toLocaleDateString("en-US",options);
     
    res.render("list",{kindOfDay:day , newListItems: items});
});

app.get("/work",function (req,res){
    res.render("about", {newListItems:items_2});
    
})

app.post("/" , function(req, res){
    var item =req.body.newItem;
    items.push(item);
    res.redirect("/");
})
app.post("/work" , function(req, res){
    var item =req.body.newItem;
    items_2.push(item);
    res.redirect("/work");
});




app.listen(3000, function(){
    console.log("server is up and running on port 3000")
})