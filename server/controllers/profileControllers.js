const User = require("../models/userModel");
const { genToken } = require("../utils/genToken");
//single private profile get
module.exports.privateProfileGet = (req, res, next) => {
    try {
        if (!(req?.user?._id)) {
            return res.status(400).json({ error: { email: 'profile does not exists' } });
        }
        return res.status(200).json({ data: req?.user })
    }
    catch (error) {
        next(error)
    }
}

//single public profile get 
module.exports.publicProfileGet = async (req, res) => {

    if (!(req?.params?.id)) {
        console.log('please provide single profile params id')
        return res.status(400).json({ error: { email: 'profile does not exists' } });
    }
    try {
        const user = await User.findOne({ _id: req.params?.id?.trim() }).select("-password")
        return res.status(200).json({ data: user })
    }
    catch (error) {
        next(error)
    }
}
module.exports.profileUpdate = async (req, res, next) => {
    if (!(req?.user?._id)) {
        console.log('please provide single profile params id')
        return res.status(400).json({ error: { email: 'profile does not exists' } });
    }
    const { firstName, lastName, email, phone, gender, birthDate, pic, userInfo } = req.body;
    const latitude = req?.body?.location?.latitude || 0;
    const longitude = req?.body?.location?.longitude || 0;
    const address = req?.body?.location?.address;
    const houseNumber = req?.body?.location?.houseNumber;
    const floor = req?.body?.location?.floor;
    const information = req?.body?.location?.information;
    try {
        if (!(req?.user?._id)) {
            console.log('please provide user valid credentials!')
            return res.status(400).json({ error: { email: 'profile does not exists' } });
        }
        const user = await User.findOneAndUpdate({ _id: req?.user?._id }, {
            firstName, lastName, email, phone, gender, birthDate, userInfo,
            role: role || req.user.role, phone, pic, location: { latitude, longitude, address, houseNumber, floor, information }, geometry: { type: "Point", "coordinates": [Number(longitude), Number(latitude)] }
        }, { new: true }).select("-password");
        const userData = {};
        userData.user = user;
        userData.token = genToken(user?._id);
        const data = {
            data: user,
            token: genToken(user?._id)
        }
        var date = new Date();
        date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
        const options = {
            expires: date, httpOnly: true
        }
        return res.status(201).cookie('userCurrent', data, options).json({
            message: 'Profile Update Successfully',
            data: userData,
        });
    }
    catch (error) {
        next(error)
    }
}

module.exports.removeUserProfile = async (req, res, next) => {
    if (req?.user?._id) {
        return res.status(400).json({ error: { email: 'user permission denied! Please provide valid user credentials!' } })
    }
    try {
        await User.deleteOne({ _id: req?.params?.id?.trim() }, function (err) {
            if (err) {
                return res.status(400).json({ error: { email: "User Remove failed!" } })
            }
            if (!err) {
                return res.status(200).json({ message: 'User Successfully Removed!' })
            }
            // deleted at most one tank document
        });
    }
    catch (error) {
        next(error)
    }
}