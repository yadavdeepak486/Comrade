const express = require('express');
const router = express.Router();

const SendOtp = require('sendotp');
const sendOtp = new SendOtp('351065AThUWMW1ss60052d52P1');

var randomotp = Math.floor((Math.random() * 100000) + 100000)

router.post('/sendotp', async (req, res) => {
    const getmobnumber = req.body.mobile;

    sendOtp.send(getmobnumber, "comradesms", randomotp, function (error, data) {
        console.log(data);
        if (data.type == 'success') console.log('OTP sent successfully')
        if (data.type == 'error') console.log('Error')
    });
    res.json({
        status: "success",
        message: `${randomotp}`
    })
})

router.post('/verifyotp', (req, res) => {
    const getmobnumber = req.body.mobile;
    sendOtp.verify(getmobnumber, randomotp, function (error, data) {
        console.log(data); // data object with keys 'message' and 'type'
        if (data.type == 'success') console.log('OTP verified successfully')
        if (data.type == 'error') console.log('OTP verification failed')
    });
    res.json({
        status: "OTP verified",
        verified: true
    })
})

module.exports = router;