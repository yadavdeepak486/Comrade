
const express = require('express');
const router = express.Router();
const multer = require('multer');

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

var upload = multer({
    storage: Storage
})

//.array("imgUploader", 3);

router.get("/upload", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

router.post("/upload", upload.single('avatar'), function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded successfully!.");
    })
});

module.exports = router;