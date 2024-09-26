const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});
  
// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // if username is updated but not password, skip hashing
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
  
// Compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
  
module.exports = mongoose.model('User', userSchema);