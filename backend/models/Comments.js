const mongoose = require('mongoose');
const { Schema } = mongoose;


const CommentsSchema = new Schema({
    //Primary key --> Foriegn Key Definition
    appid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apps'
    },
    by:{
        type: String,
        default: 'Admin'
    },
    name:{
        type: String,
        default: 'Admin'
    },
    comment:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('comments', CommentsSchema);