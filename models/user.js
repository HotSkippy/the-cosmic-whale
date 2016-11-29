var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//require passport/passport local.. make middleware

var schema = new Schema({
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


module.exports = mongoose.model('User', schema);
