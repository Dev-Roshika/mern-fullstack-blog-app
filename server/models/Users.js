const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    img: {
        type: String,
        default: ""
    }   
});


const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel; // Exporting the model so that we can use it in other files