const SendOtp = require('sendotp');
const express = require('express');
const router = express.Router();


const sendOtp = new SendOtp("351065A1dKwJf83zmK5ff46488");

router.post('/', async (req, res) => {

    const contactNumber = new User({ phoneNumber: req.body.phoneNumber })

    sendOtp.send(contactNumber, "comradesms", callback);
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;


