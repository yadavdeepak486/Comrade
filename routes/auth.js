const { response } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const SendOtp = require('sendotp');

const User = require('../models/user');
const sendOtp = new SendOtp('351065AThUWMW1ss60052d52P1');
//const Deepak = require('../models/deepak')


router.post('/sendotp', async (req, res) => {
    const getmobnumber = req.body.mobile;
    randomotp = Math.floor((Math.random() * 100000) + 100000)
    sendOtp.send(getmobnumber, "comradesms", randomotp, function (error, data) {
        console.log(data);
        if (data.type == 'success') {
            res.json({
                data,
                otp: `${randomotp}`
            })
            console.log('OTP sent successfully')
        }
        if (data.type == 'error') {
            res.json({
                data
            })
            console.log('Error')
        }
    });

})

//OTP verify section
/*
router.post('/someapidoesntworked', async (req, res) => {
    const getmobnumber = req.body.mobile;
    const obj = {}
    const receivedotp = req.body.otp
    const findIf = await User.find({ phone: req.body.mobile })
    obj.new_data = findIf


    if (obj.new_data.length == 0) {
        console.log("User not found please login");
        var someuser = new User({
            phone: req.body.mobile
        })
        try {
            const savedUser = await someuser.save();
            console.log("User saved successfully!");
            console.log(savedUser);

        } catch (error) {
            console.log("User not saved");
        }
    }

    sendOtp.verify(getmobnumber, receivedotp, async function (error, data) {
        if (data.type == 'success') {
            const findsaveduser = await User.find({ phone: req.body.mobile })
            obj.data = data
            res.json({
                status: true,
                obj,
                savedUser: findsaveduser._id
            })
            console.log('OTP verification successful', data)
        }
        if (data.type == 'error') {
            const findsaveduser = User.find({ phone: req.body.mobile })
            obj.data1 = data
            res.json({
                status: false,
                obj,
                savedUser: findsaveduser._id
            })
            console.log('OTP verification failed')
        }
        return data
    });
})
 */

/*
router.post('/tryverify', async (req, res) => {
    const getmobnumber = req.body.mobile
    const receivedotp = req.body.otp
    const obj = {}

    sendOtp.verify(getmobnumber, receivedotp, async function (error, data) {
        if (data.type == 'success') {
            const findIf = await User.findOne({ phone: getmobnumber })
            if (!findIf) {
                console.log('User not found but saved')
                var someuser = new User({
                    phone: req.body.mobile
                })
                someuser.save().then(resp => {
                    obj.data1 = data
                    res.json({
                        message: "new user",
                        userExist: false,
                        userSaved: true,
                        Id: resp,
                        obj,
                    })
                })
            } else {
                obj.data2 = data
                res.json({
                    status: true,
                    message: "User already existed",
                    userExist: true,
                    // Id: findIf,
                    obj
                })
            }
        }
        if (data.type == 'error') {
            const findIf = await User.findOne({ phone: getmobnumber })
            if (!findIf) {
                console.log('User not found please login')
                var someuser = new User({
                    phone: req.body.mobile
                })
                someuser.save().then(resp => {
                    obj.data3 = data
                    res.json({
                        status: false,
                        message: "new user",
                        userExist: false,
                        userSaved: true,
                        Id: resp._id,
                        obj,
                    })
                    console.log("user in if");
                })
            } else {
                obj.data4 = data
                res.json({
                    status: false,
                    obj,
                    message: "User already existed",
                    userExist: true,
                    Id: findIf._id
                })
                console.log("got in else");
            }
        }
        // return data
    })
})
 */

router.post('/verifyotp', async (req, res) => {
    const getmobnumber = req.body.mobile
    const receivedotp = req.body.otp
    const obj = {}

    sendOtp.verify(getmobnumber, receivedotp, async function (error, data) {
        if (data.type == 'success') {
            const findIf = await User.findOne({ phone: getmobnumber })
            if (!findIf) {
                console.log('User not found please login')
                var someuser = new User({
                    phone: req.body.mobile
                })
                someuser.save().then(resp => {
                    obj.data = data
                    res.json({
                        status: true,
                        obj,
                        savedUser: resp._id
                    })
                })
            } else {
                obj.data1 = data
                res.json({
                    status: true,
                    obj,
                    savedUser: findIf._id
                })
            }
        }
        if (data.type == 'error') {
            const findsaveduser = await User.find({ phone: getmobnumber })
            obj.data4 = data
            res.json({
                status: false,
                obj,
                savedUser: findsaveduser._id
            })
            console.log('OTP verification failed')
        }
        // return data
    })
})


router.post('/finduser', async (req, res) => {

    try {
        const findIf = await User.find({ phone: req.body.mobile })
        res.json({
            status: true,
            totalmatchs: findIf.length,
            findIf,
            userid: findIf._id,
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})


router.post('/findlogin', async (req, res, next) => {
    //const { email, password } = req.body
    const user = await User.findOne({
        phone: req.body.mobile
    })
    if (!user) return res.json({ status: false, message: 'User not Registered' })
    //const validPassword = await validatePassword(password, user.password)
    //if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign(
        {
            userId: user._id
        },
        'abcdefghijklm',
        {
            expiresIn: '1d'
        }
    )
    await User.findByIdAndUpdate(user._id, {
        accessToken
    })
    res.json({
        status: true,
        message: 'login sucessfully', accessToken: accessToken
    })
})

module.exports = router;