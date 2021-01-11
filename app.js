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


app.use('/api', Users);
app.use('/api', Posts);
app.use('/api', Userimg);
app.use('/api', express.static('upload/images'))
app.use('/api', Sendop)


//Routes
app.get('/api', (req, res) => {
    res.send("We are at home");
})


DB_CONNECTION = "mongodb+srv://deepakdevelopersveltose01:pass@123@comrade.8vvxj.mongodb.net/ComradeUser?retryWrites=true&w=majority"

//connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB!');
});


//listen on Local Host
app.listen(3600, () => {
    console.log("Server running at http://localhost:3600/");
});


