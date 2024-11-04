const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

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

// compare passwords
userSchema.methods.comparePassword = function (currPassword) {
    return bcrypt.compare(currPassword, this.password);
}

// hash passwords to ensure the security
userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
})

const User = new model('User', userSchema);
module.exports = User;
