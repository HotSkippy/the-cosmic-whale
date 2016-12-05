'use strict'

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

// CREATE
<<<<<<< HEAD
router.post("/:id/comment", function(req, res){
    req.body.comment = req.sanitize(req.body.comment);
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            console.log(foundBlog);
            Comment.create(req.body, function(err, newComment){
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
            res.redirect("/blogs/" + foundBlog._id);
                }
            });
=======
router.post("/", function(req, res) {
    req.body.comment = req.sanitize(req.body.comment);
    console.log("post route hit");
    console.log(req.body, "passing me in");
    Blog.findById(req.body.blog_id).exec((err, foundBlog) => {
        console.log(foundBlog, "find by id occured");
    }).then(function(foundBlog) {
        if (!req.user) {
            res.redirect("/blogs")
>>>>>>> a34e5132744091cdf4b3b09e906f7dac36032962
        }
        Comment.create(req.body, function(err, newComment) {
            //save id and username
            newComment.author.id = req.user._id;
            newComment.author.username = req.user.local.firstName;
            newComment.save();
            //push comment to blog and save
            foundBlog.comments.push(newComment);
            foundBlog.save();
        }).catch((err) => console.log("an error occured!!!!"))
    });
    res.redirect("back");
});

// UPDATE
router.put("/:cid", function(req, res) {
    req.body.content = req.sanitize(req.body.content);
    Comment.findByIdAndUpdate(req.params.id, req.body, function(err, updatedComment) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:cid", function(req, res) {
    Comment.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;
