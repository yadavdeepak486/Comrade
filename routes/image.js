
const express = require('express');
const router = express.Router();
const multer = require('multer');

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Images');
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
    res.sendFile(__dirname, + "/index.html");
})


router.post("/upload", upload.array('avatar', 10), async (req, res) => {
    var fileinfo = req.file;
    // var title = req.body.title;

    console.log(fileinfo);
    if (!res) {
        res.json({
            message: fileinfo
        })
    }
    if (res) {
        res.json({
            message: "File uploaded successfully!!",
            link: fileinfo,
            directory: __dirname
        })
    }
});

module.exports = router;