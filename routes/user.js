const express = require('express');
const router = express.Router();
const User = require('../models/user');

// get User
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err })
    }
});


// post User
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        interest_gender: req.body.interest_gender,
        interest_in: req.body.interest_in


    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;