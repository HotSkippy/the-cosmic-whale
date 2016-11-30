'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    created: {
      type: Date,
      default: Date.now
    }
});

schema.plugin(passportLocalMongoose)

// // hash password
// schema.methods.generateHash = password =>
//   bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//
// // check password
//
// schema.methods.validatePassword = password =>
//   bcrypt.compareSync(password, this.local.password);

module.exports = mongoose.model('User', schema);
