var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
    name:String,
    address:String,
    pos:{lat:Number, lon:Number},
    color:String
});

module.exports = mongoose.model("Place", placeSchema);
