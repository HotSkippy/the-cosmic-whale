'use strict'

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

module.exports = function(passport) {
    router.get('/', (req, res) => {
        res.render('login', {
            user: req.user
        });
    });

    router.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signinMessage')
        });
    })

    router.post('/signup', (req, res) => {
			console.log(req.body, "i am in the auth route");
		});
		// passport.authenticate('local-signup', {
    //     successRedirect: '/index',
    //     failureRedirect: '/login',
    //     faiulreFlash: true
    // }),

    router.get('/login', (req, res) => {
        res.render('login', {
            user: req.user,
            message: req.flash('loginMessage')
        });
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/index',
        failureRedirect: '/login',
        faiulreFlash: true
    }));

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    router.get('/ping', function(req, res) {
        res.status(200).send("pong!");
    });
    return router
}
