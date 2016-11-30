'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport) {
console.log("passport here");
    passport.serializeUser((user, done) => {
      console.log(user, "user");
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
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
        User.findOne({
            'local.email': email
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'Invalid email or password.'));
            }
            if (!user.validatePassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Invalid email or password.'))
            }
            return done(null, user);
        })
    }));
};
