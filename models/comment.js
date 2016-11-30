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

schema.post('remove', (comment) => {
    User.findById(comment.user, (err, user) => {
        user.comment.pull(comment)
        user.save();
    });
});

module.exports = mongoose.model('Blog', schema);
