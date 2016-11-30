var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//use moment

var User = require('./user')

var schema = new Schema({
    title: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    created: {
      type: Date,
      default: Date.now
    }
});

schema.post('remove', (blog) => {
    User.findById(blog.user, (err, user) => {
      if (blog.user.isAdmin === true){
        user.blog.pull(blog)
        user.save();
      } 
    });
});

module.exports = mongoose.model('Blog', schema);
