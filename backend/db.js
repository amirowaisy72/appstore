const mongoose = require('mongoose');
const { MONGOURI } = require('./config/key')
// const url = 'mongodb://0.0.0.0:27017/appstore';
const url = MONGOURI
mongoose.set('strictQuery', false);

const connecToMongoose = ()=>{
    mongoose.connect(url);
    if(connecToMongoose){
        console.log("Connected to mong db")
    }
};

module.exports = connecToMongoose;