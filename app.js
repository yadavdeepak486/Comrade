const express = require('express');


const app = express();


const mongoose = require('mongoose');



const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();



const path = require('path');



//Middleware
const Users = require('./routes/user');
const Posts = require('./routes/posts');
const Userimg = require('./routes/userimg');

//const Login = require('./routes/login');
const Sendop = require('./routes/send');



//Route using
app.use(bodyParser.json());
app.use(cors());

app.use('/users', Users);
app.use('/posts', Posts);
app.use('/userimg', Userimg);
//app.use('/image', Image);
//app.use('/login', Login)
app.use('/profile', express.static('upload/images'))
app.use('/send', Sendop)


//Routes
app.get('/', (req, res) => {
    res.send("We are at home");
})

//connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB!');
});


//listen on Local Host
app.listen(3600, () => {
    console.log("Server running at http://localhost:3600/");
});


