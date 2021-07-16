const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    secret_token:{
        type: String,
        required: true,
        min: 24,
        max: 1024
    },
    public_token:{
        type: String,
        required: true,
        min: 24,
        max: 1024
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Account', accountSchema);