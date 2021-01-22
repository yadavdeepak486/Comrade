const express = require('express');
const router = express.Router();

const SendOtp = require('sendotp');
const user = require('../models/user');
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


router.post('/verifyotp', (req, res) => {
    const getmobnumber = req.body.mobile;
    const receivedotp = req.body.otp



    sendOtp.verify(getmobnumber, receivedotp, function (error, data) {
        console.log(data);
        if (data.type == 'success') {

            res.json({
                data
            })
            console.log('OTP verification successful')
        }
        if (data.type == 'error') {
            res.json({
                data
            })
            console.log('OTP verification failed')
        }
    });


    //check weather mobile registered or not

})
module.exports = router;