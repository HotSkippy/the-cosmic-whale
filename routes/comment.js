'use strict'

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

// CREATE
router.post("/", function(req, res){
    req.body.comment = req.sanitize(req.body.comment);
    console.log("post route hit");
    console.log(req.body, "passing me in");
    Blog.findById(req.body.blog_id, function(err, foundBlog){
      console.log(foundBlog, "find by id occured");
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    res.redirect("/blogs");
                } else {
                  console.log(foundBlog.comments, "blah I am here");
                    //save id and username
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.local.firstName;
                    newComment.save();
                    //push comment to blog and save
                    foundBlog.comments.push(newComment);
                    foundBlog.save();
                    console.log(foundBlog, "should be saving");
                }
            });
            // res.redirect("back");
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
