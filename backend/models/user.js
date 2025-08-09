const mongoose = require('mongoose'); 

const schemna = mongoose.Schema
const userSchema = new schemna({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    key:{ type: String, required: true }
});
const UserModel = mongoose.model('Users', userSchema); 
module.exports = UserModel;      