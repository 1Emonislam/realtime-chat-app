const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    online: {
        type: Boolean,
    },
    lastOneline: {
        type: Date,
        default: null
    },
    username: {
        type: String,
        required: [true, 'Must be at least 3 characters'],
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'invalid email'],
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: [true, 'Must be at least 8 characters'],
        min: 8,
    },
    phone: {
        type: String,
        default: 'N/A'
    },
    gender: {
        type: String,
        default: 'N/A'
    },
    birthDate: {
        type: Date,
        default: null
    },
    pic: {
        type: String,
        default: "https://i.ibb.co/BGbPkX9/dummy-avatar-300x300-1.jpg",
    },
    info: {
        type: String,
        trim: true
    },
    socialMedia: [
        {
            facebook: {
                type: String,
                default: 'N/A'
            },
            twitter: {
                type: String,
                default: 'N/A'
            },
            linkedin: {
                type: String,
                default: 'N/A'
            },
            github: {
                type: String,
                default: 'N/A'
            },
            youtube: {
                type: String,
                default: 'N/A'
            },
            instagram: {
                type: String,
                default: 'N/A'
            },
            stackoverflow: {
                type: String,
                default: 'N/A'
            }
        }
    ]
}, {
    timestamps: true,
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model("User", userSchema)
module.exports = User;