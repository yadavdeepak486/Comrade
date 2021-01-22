const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const SendOtp = require('sendotp');
const User = require('../models/user');
const sendOtp = new SendOtp('351065AThUWMW1ss60052d52P1');



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


router.post('/verifyotp', async (req, res) => {
    const getmobnumber = req.body.mobile;
    const obj = {}
    const receivedotp = req.body.otp
    const findIf = await User.find({ phone: req.body.mobile })
    obj.new_data = findIf

    sendOtp.verify(getmobnumber, receivedotp, function (error, data) {
        if (data.type == 'success') {
            obj.data = data
            res.json({
                obj,
                status: "userCheck(status)"
            })
            console.log('OTP verification successful', data)
        }
        if (data.type == 'error') {
            obj.data1 = data
            res.json({
                obj,
                status: "userCheck(status)"
            })
            console.log('OTP verification failed')
        }
        return data
    });

})

router.post('/finduser', async (req, res) => {

    try {
        const findIf = await User.find({ phone: req.body.mobile })

        res.json({
            status: true,
            totalmatchs: findIf.length,
            findIf,
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