'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const schema = new Schema({
    local: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
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
        created: {
            type: Date,
            default: Date.now
        }
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    },
});

// schema.plugin(passportLocalMongoose)

// hash password
schema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// check password

schema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', schema);
