'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {

})

router.post('/:id', (req, res, next) => {
  res.send('respond with a resource');
});

router.delete('/:id', (req, res, next) => {
  res.send('delete a resource')
})


module.exports = router;
