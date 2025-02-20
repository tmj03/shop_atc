// src/app/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema


const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});


module.exports = mongoose.model('User', User);
