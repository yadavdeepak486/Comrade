const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv').config();
const path = require('path');

//auth


//Middleware
const Img = require('./routes/image')
const Auth = require('./routes/auth')
const Users = require('./routes/user');
const Match = require('./routes/match');
const Superlike = require('./routes/superlike')
const Chat = require('./routes/chat')



//Route using
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', Img)
app.use('/api', Auth)
app.use('/api', Users);
app.use('/api', Match);
app.use('/api', Superlike)
app.use('/api', Chat)




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


