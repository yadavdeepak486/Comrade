const multer = require('multer');
const path = require('path');

// specify the storage engine



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`)
    }
})

// file validation

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || /*file.mimetype === 'image/jpg' ||*/ file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb({ message: 'Unsupported file format' }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})

module.exports = upload;