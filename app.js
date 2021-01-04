const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/comrade";

const bodyParser = require('body-parser');
require('dotenv/config');


//Middleware
const Users = require('./routes/user');
const Posts = require('./routes/posts');
const Userimg = require('./routes/userimg');


//Route using
app.use(bodyParser.json());
app.use('/users', Users);
app.use('/posts', Posts);
app.use('/userimg', Userimg)
app.use('/profile', express.static('upload/images'))



//Routes
app.get('/', (req, res) => {
    res.send("We are at home");
})

//connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(url, () => {
    console.log('Connected to DB!');
});

// MongoClient.connect(url,function(err,db){
//     if (err) throw err;
//     console.log("Database Created!!");
//     db.close();
// })


//listen on Local Host
app.listen(3400);