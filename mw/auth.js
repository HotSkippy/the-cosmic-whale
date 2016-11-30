// 'use strict'
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const knex = require('../db/knex');
//
// function validPassword(password, dbPassword) {
//     return bcrypt.compareSync(password, dbPassword);
// }
//
// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated()){
//     console.log('user is logged in');
//     return next();
//   }
//   console.log('log in fool');
// }
//
// function createUser(req, res) {
//     const hash = bcrypt.hashSync(req.body.password, 12);
//     knex('users')
//         .where('email', req.body.email)
//         .first()
//         .then((user) => {
//             if (!user) {
//                 // console.log('email, pass', req.body.email, req.body.password);
//                 let newUser = {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     email: req.body.email,
//                     hashedPassword: hash
//                 }
//                 // console.log(newUser);
//                 return knex('users')
//                     .insert((newUser), '*');
//             }
//         })
//         .then((rows) => {
//             if (!rows) {
//                 return next(err)
//             }
//             // console.log('createUsers row', rows);
//             var nUser = rows[0];
//             req.login(nUser, function() {
//                 return res.json('signed up');
//             });
//         })
//         .catch((err) => {
//             return (err);
//         });
// }
//
// module.exports = {
//   validPassword,
//   isLoggedIn,
//   createUser
// };
