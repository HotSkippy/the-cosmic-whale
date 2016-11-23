var express = require('express');

var app = express();
app.set("view engine", "ejs");

// ROOT ROUTE
app.get("/", function(req, res){
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("THE COSMIC WHALE HAS SHIPPED");
});