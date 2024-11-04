const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    fullName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    confirmPassword: {type: String, require: true},
    role: {
        type: String, default: 'user'
    },
    phoneNumber: {type: String}
})

const User = new model('User', userSchema);
module.exports = User;
