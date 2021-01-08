const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

//Storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    //    fileFilter: fileFilter
})

app.use('/profile', express.static('upload/images'))


//post method
app.post("/upload", upload.single('profile'), (req, res) => {
    console.log(req.file)
    res.json({
        success: 1,
        profile_url: `http://localhost:6700/profile/${req.file.filename}`
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}

app.use(errHandler);


app.listen(6700, () => {
    console.log("Server running at http://localhost:6700/");
})