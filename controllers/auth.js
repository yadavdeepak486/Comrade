const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');
const SendOtp = require("sendotp");


// pass your msg91 otp creditials SendOtp
//const  sendOtp = new  SendOtp("346295A3SnqiV25fa256b6P1");
const sendOtp = new SendOtp("351065A1dKwJf83zmK5ff46488");
// using promise
exports.SENDOTP = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    sendOtp.send(req.body.phoneNumber, "comradesms", (err, data) => {
        // console.log(">>>>>",data)
        if (err) return res.json({ err });
        data.type == "success"
            ? res.json({ success: true })
            : res.json({ success: false });
    });
    // user.save((err, user) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(400).json({
    //             // error: errorHandler(err)
    //             error: 'Phone is taken'

    //         });
    //     }
    //     // user.salt = undefined;
    //     // user.hashed_password = undefined;
    //     res.json({
    //         user
    //     });
    // });
};
exports.VERIFYOTP = (req, res) => {
    sendOtp.verify(req.body.phoneNumber, req.body.otp, function (err, data) {
        console.log("req.body", req.body);
        if (err) return res.json({ err });
        if (data.type == "success") {
            let { phoneNumber } = req.body;
            User.findOne({ phoneNumber }, (err, user) => {
                if (err) return res.json({ err });
                if (!user) {
                    // user signup

                    User.create(req.body, (err, user) => {
                        console.log(req.body)
                        if (err) return res.json({ err });
                        jwt.sign(
                            {
                                userId: user._id,
                                phoneNumber: user.phoneNumber
                            },
                            "thisissecret",
                            (err, signuptoken) => {
                                if (err) return res.json({ err });
                                res.json({
                                    success: true,
                                    signuptoken,
                                    userId: user._id,
                                    message: "registered successfully"
                                });
                            }
                        );
                    });
                }
                if (user) {
                    // user signin
                    jwt.sign(
                        {
                            userId: user._id,
                            phoneNumber: user.phoneNumber
                        },
                        "thisissecret",
                        (err, logintoken) => {
                            if (err) return res.json({ err });
                            res.json({ logintoken, userId: user._id });
                        }
                    );
                }
            });
        }
        if (data.type == "error") res.json({ success: false, message: data.message });
    });
};


exports.signin = (req, res) => {
    // find the user based on email
    console.log(req.body)
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};
exports.employeeCreate = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Email is taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};


