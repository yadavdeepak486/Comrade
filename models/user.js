const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true,
        trim: true
    },
    interest_gender: {
        type: String,
        required: true
    },
    interest_in: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true

    },
    height: {
        type: Number,
        required: true

    },
    drinking: {
        type: Boolean,
        required: true

    },
    smoking: {
        type: Boolean,
        required: true

    },
    language: {
        type: String,
        required: true

    },
    relationship_status: {
        type: String,
        required: true

    },
    sexuality: {
        type: String,
        required: true

    },
    active_status: {
        type: String,
        default: true

    },
    blocked_status: {
        type: String,
        default: false

    },
    moods: {
        type: String
    },
    hashtag: {
        type: Array,
        of: String
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('users', UserSchema);