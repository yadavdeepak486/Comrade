const express = require('express');
const router = express.Router();
const User = require('../models/user');

// get all Users ..w
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err })
    }
});


// post User ..w
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        interest_gender: req.body.interest_gender,
        interest_in: req.body.interest_in,
        about: req.body.about,
        education: req.body.education,
        job: req.body.job,
        height: req.body.height,
        drinking: req.body.drinking,
        smoking: req.body.smoking,
        language: req.body.language,
        relationship_status: req.body.relationship_status,
        sexuality: req.body.sexuality
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});



//Find specific user ..w
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a user .. nw
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await this.User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
})

//Update a user ..w
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId }, {
            $set: { password: req.body.password }
        }
        );
        res.json(updatedUser)
    } catch (err) {
        res.json9({ message: err });
    }
})

module.exports = router;