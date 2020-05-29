var mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);