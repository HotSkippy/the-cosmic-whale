'use strict'

const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// INDEX
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("blogs/index", {blogs: blogs});
        }
    });
});

// NEW
// router.get("/new", function (req, res){
//    res.render("blogs/new");
// });

// CREATE
router.post("/", function(req, res){
    req.body.body = req.sanitize(req.body.body);
    Blog.create(req.body, function(err, newBlog){
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
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("blogs/show", {
              blog: foundBlog,
              user: req.user});
        }
    });
});

// // EDIT
// router.get("/:id/edit", function(req, res) {
//     Blog.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.render("/blogs");
//         } else {
//             res.render("blogs/edit", {blog: foundBlog});
//         }
//     });
// });

// UPDATE
router.put("/:id", function(req, res){
    req.body.content = req.sanitize(req.body.content);
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;
