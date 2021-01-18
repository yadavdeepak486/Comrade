const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const path = require('path');

//auth


/*
sendOtp.send("918871782180", "comradesms", '2321', function (error, data) {
    console.log(data);
    if (data.type == 'success') console.log('OTP verified successfully')
    if (data.type == 'error') console.log('OTP verification failed')
});
*/


//Middleware
const Auth = require('./routes/auth')
const Users = require('./routes/user');


//Route using
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', Auth)
app.use('/api', Users);


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


