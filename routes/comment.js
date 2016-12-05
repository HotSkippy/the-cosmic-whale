'use strict'

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

// CREATE
router.post("/", function(req, res){
    req.body.comment = req.sanitize(req.body.comment);
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    res.redirect("/blogs");
                } else {
                    //save id and username
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.local.firstName;
                    newComment.save();
                    //push comment to blog and save
                    foundBlog.comments.push(newComment);
                    foundBlog.save();
                }
                res.redirect("back");
            });
        }
    })
});

// UPDATE
router.put("/:cid", function(req, res){
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
router.delete("/:cid", function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;
