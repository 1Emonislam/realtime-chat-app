const { mongoose, Schema } = require("mongoose");
const bcrypt = require('bcryptjs');
const geometrySchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});
const userSchema = new mongoose.Schema({
    online: {
        type: false,
        default: false
    },
    socketId: {
        type: String,
        default: null
    },
    lastOneline: {
        type: Date,
        default: new Date()
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Friends',
    }],
    firstName: {
        type: String,
        required: [true, 'First Name is Required']
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'invalid email'],
        lowercase: true,
        trim: true
    },
    emailVerified: {
        type: Boolean
    },
    phoneVerified: {
        type: Boolean,
    },
    verifiedBadge: {
        type: Boolean,
    },
    password: {
        type: String,
        required: [true, 'Must be at least 8 characters'],
        min: 8,
    },
    phone: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    location: {
        latitude: {
            type: Number,
            default: 0,
        },
        longitude: {
            type: Number,
            default: 0
        },
        address: {
            type: String,
            default: 'N/A'
        },
        information: {
            type: String,
            default: 'N/A'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    geometry: geometrySchema,
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female', 'others', ''],
        default: ''
    },
    birthDate: {
        type: String
    },
    nickName: {
        type: String,
        default: 'N/A'
    },
    pic: {
        type: String,
        default: "https://i.ibb.co/BGbPkX9/dummy-avatar-300x300-1.jpg",
    },
    userInfo: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    status: {
        type: String,
        default: 'active'
    },
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