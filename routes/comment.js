'use strict'

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

// INDEX
router.get("/", function(req, res){
    Comment.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("blogs/index", {blogs: blogs});
        }
    });
});

// NEW
router.get("/new", function (req, res){
   res.render("blogs/new");
});

// CREATE
router.post("/", function(req, res){
    req.body.body = req.sanitize(req.body.body);
    Comment.create(req.body, function(err, newComment){
        if(err){
            res.render("blogs/new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW
router.get("/:id", function(req, res){
  console.log(req.user, "i am here");
    Comment.findById(req.params.id, function(err, foundComment){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("blogs/show", {
              blog: foundComment,
              user: req.user});
        }
    });
});

// EDIT
router.get("/:id/edit", function(req, res) {
    Comment.findById(req.params.id, function(err, foundComment){
        if(err){
            res.render("/blogs");
        } else {
            res.render("blogs/edit", {blog: foundComment});
        }
    });
});

// UPDATE
router.put("/:id", function(req, res){
    req.body.content = req.sanitize(req.body.content);
    Comment.findByIdAndUpdate(req.params.id, req.body, function(err, updatedComment){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:id", function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;
