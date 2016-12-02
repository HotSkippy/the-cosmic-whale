'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user)
    });

    passport.deserializeUser((user, done) => {
        User.findById(user._id, (err, user) => {
          delete user.local.password;
          delete user.local.isAdmin;
          console.log(user.local.password, "deserializeUser");
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        console.log(req.body, email, password, "herre in passport.js");
        process.nextTick(() => {
            User.findOne({
                'local.email': email
            }, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, false, req.flash('signupMessage'))
                } else {
                    let newUser = new User();
                    newUser.local.firstName = req.body.firstName
                    newUser.local.lastName = req.body.lastName
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save((err) => {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        console.log("got ya here", req.body, email, password);
        User.findOne({
            'local.email': email
        }, (err, user) => {
            console.log("got your user here", user);
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log("no user");
                return done(null, false, req.flash('loginMessage', 'Invalid email or password.'));
            }
            if (!user.validatePassword(password)) {
                console.log(!user.validatePassword(password), "pass failing?");
                return done(null, false, req.flash('loginMessage', 'Invalid email or password.'))
            } else {
                console.log(user, "user returning");
                return done(null, user);
            }
        })
    }));
};
