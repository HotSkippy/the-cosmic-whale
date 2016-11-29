var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//use moment for date

var User = require('./user')

var schema = new Schema({
    body: {
        type: String,
        required: true
    },
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    }
});

schema.post('remove', (message) => {
    User.findById(message.user, (err, user) => {
        user.messages.pull(message)
        user.save();
    });
});

module.exports = mongoose.model('Blog', schema);
