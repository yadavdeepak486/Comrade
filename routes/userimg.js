const express = require('express');
const router = express.Router();
const Userimg = require('../models/userimg');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
});


// //get Image
router.get('/', (req, res) => {
    res.send("This is to get send image");
})

//Post Image
router.post('/', upload.single('userImage'), async (req, res) => {
    console.log(req.file);
    res.json({
        success: 1,
        profile_url: `http://localhost:3400/profiles/${req.file.originalname}`
    })
});

module.exports = router;