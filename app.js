var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Place = require("./models/place");

mongoose.connect("mongodb://localhost/food_finder_v2");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/places", function(req, res) {
    Place.find({}, function(err,allPlaces){
        if (err){
            console.log(err);
        } else {
            
            allPlaces = JSON.stringify(allPlaces);
            console.log(allPlaces);
            res.render("places", {places: allPlaces});
        }
    });
});

app.get("/new", function(req,res){
    res.render("new");
});

app.post("/new", function(req,res){
    var name = req.body.name;
    var lat = req.body.lat;
    var lon = req.body.lon;
    var address = req.body.address;
    var newPlace = {
        name:name,  
        address:address,
        pos:{lat:lat, lon:lon}
    };
    Place.create(newPlace, function(err,place){
        if (err){
            console.log(err);
        }else{
            res.redirect("/places");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("food app begungen");
})