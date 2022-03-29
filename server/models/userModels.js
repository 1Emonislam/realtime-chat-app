const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Must be at least 3 characters'],
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: [true,'invalid email'],
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: [true,'Must be at least 8 characters'],
        min: 8,
    },
    isPic: {
        type: Boolean,
        default: false,
    },
    pic: {
        type: String,
        default: "",
    },
});
const User = mongoose.model("User", userSchema)
module.exports = User;