'use strict'

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('login', {
		user: req.user
	});
});

router.get('/signup', (req, res) => {
	res.render('signup', {
		message: req.flash('loginMessage')
	});
})

router.post('/signup', (req, res) => {
	User.register(new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	}), req.body.password, (err, user) => {

		passport.authenticate('local')(req, res, () => {
			res.redirect('/')
		});
	});
});

router.get('/login', (req, res) => {
	res.render('login', {
		message: req.flash('loginMessage')
	});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.redirect('index')
})

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/ping', function(req, res) {
	res.status(200).send("pong!");
});

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
}
module.exports = router;
