const connecToMongoose = require('./db');
const express = require('express');
const app = express();
connecToMongoose();
var cors = require('cors');


app.use(express.json());
app.use(cors());
//Available Routes
app.use('/apps', require('./routes/apps.js'));
app.use('/comments', require('./routes/comments.js'));

if(process.env.NODE_ENV=='production'){
    const path = require('path')
    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, '../frontend', 'build')))
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    })
}

app.listen(5000, ()=>{
    console.log('listening at port 5000');
})
