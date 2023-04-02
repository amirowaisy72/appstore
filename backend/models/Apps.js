const mongoose = require('mongoose');
const { Schema } = mongoose;


const AppsSchema = new Schema({
    //Primary key --> Foriegn Key Definition
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'model name'
    // },
    title:{
        type: String,
        required: true
    },
    shortDesc:{
        type: String,
        required: true
    },
    longDesc:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('apps', AppsSchema);