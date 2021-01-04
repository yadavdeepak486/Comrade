const mongoose = require('mongoose');

const UserImgSchema = mongoose.Schema({
    person: {
        type: String
    }
})

module.exports = mongoose.model('userimg', UserImgSchema)