'use strict'

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

// CREATE
router.post("/", function(req, res){
    req.body.comment = req.sanitize(req.body.comment);
    Comment.create(req.body, function(err, newComment){
        if(err){
            res.redirect("/blogs");
        } else {
            //author push not working ***********
            newComment.author.id = req.user._id;
            newComment.author.username = req.user.local.firstName;
        }
         res.redirect("back");
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
