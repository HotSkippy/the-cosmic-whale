var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//use moment for date

var User = require('./user')

var schema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {
      type: Date,
      default: Date.now
    }
});

// schema.post('remove', (comment) => {
//     User.findById(comment.user, (err, user) => {
//         user.comment.pull(comment)
//         user.save();
//     });
// });

module.exports = mongoose.model('Comment', schema);
