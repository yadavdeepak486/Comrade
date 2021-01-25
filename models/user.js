const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,

    },
    gender: {
        type: String,

    },
    date_of_birth: {
        type: Date,
        trim: true
    },
    interest_gender: {
        type: String,

    },
    interest_in: {
        type: String,

    },
    about: {
        type: String,

    },
    education: {
        type: String,

    },
    job: {
        type: String,
    },
    height: {
        type: Number,
    },
    drinking: {
        type: Boolean,
    },
    smoking: {
        type: Boolean,
    },
    language: {
        type: String,
    },
    relationship_status: {
        type: String,
    },
    sexuality: {
        type: String,
    },
    active_status: {
        type: String,
    },
    blocked_status: {
        type: String,
    },
    moods: {
        type: String
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('users', UserSchema);