'use strict'

const express = require('express');
const passport = require('passport');
const router = express.Router();
// const blog = require('./blog');
// const auth = require('./auth')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: `The Cosmic Whale` });
});
//
// router.use('/auth', auth);
// router.use('/blog', blog)
// login

module.exports = router;
