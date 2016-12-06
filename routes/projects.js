const express = require('express');
const router = express.Router();

router.get("/patatap", function(req, res){
    res.render("projects/patatap", {layout: 'projects/layouts/patataplayout.hbs'});
});

router.get("/todolist", function(req, res){
    res.render("projects/todolist", {layout: 'projects/layouts/todoslayout.hbs'});
});

router.get("/colorgame", function(req, res){
    res.render("projects/colorgame", {layout: 'projects/layouts/colorgamelayout.hbs'});
});

module.exports = router;