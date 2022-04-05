const User = require("../models/userModel");
const genToken = require("../utils/genToken");
module.exports.login = async (req, res, next) => {
  let { email, phone, password } = req.body;
  email?.toLowerCase();
  const user = email ? await User.findOne({ email }) : await User.findOne({ phone });
  // console.log(user)
  try {
    if (!user) {
      return res.status(400).json({ error: { "email": "Could not find user" } })
    }
    // if (user?.phoneVerified === false) {
    //   const send = await sendOtpVia(user?.phone);
    //   // console.log(send)
    //   const data = await User.findOneAndUpdate({ _id: user._id }, {
    //     role: role
    //   }, { new: true });
    //   if (send?.sent === false) {
    //     return res.status(400).json({ error: { "phone": "Phone Number UnVerified! Verify Your Phone Number. Otp Sending failed! Please try again!" }, message: `Switch Mode ${data?.role}`, role: data?.role, token: genToken(data?._id), sent: false })
    //   }
    //   if (send?.sent === true) {
    //     return res.status(200).json({ message: "Phone Number UnVerified! Verify Your Phone Number. Otp Sending Successfully!", message: `Switch Mode ${data?.role}`, role: data?.role, token: genToken(user?._id), sent: true })
    //   }
    // }
    if (!(user && (await user.matchPassword(password)))) {
      return res.status(400).json({ error: { "password": "Password invalid! please provide valid password!" } });
    } else if (user && (await user.matchPassword(password))) {
      const userExists = await User.findOne({ _id: user?._id }).select("-password");
      return res.status(200).json({ message: "Login Successfully!", data: userExists, token: genToken(userExists._id) });
    }
  }
  catch (error) {
    next(error)
  }
}

module.exports.register = async (req, res, next) => {
  try {
    const { email, firstName, lastName, phone, password2, birthDate, gender, password } = req.body;
    const username = (firstName + lastName)?.toString();
    function checkPassword(password) {
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(password);
    }
    if (!(checkPassword(password))) {
      return res.status(400).json({ error: { "passowrd": "Password should contain min 8 letter password, with at least a symbol, upper and lower case" } })
    }
    if (password !== password2) {
      return res.status(400).json({ error: { "password2": "Password and Confirm Password doesn't match!" } })
    }
    function validateEmail(elementValue) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(elementValue);
    }
    if (!(validateEmail(email))) {
      return res.status(400).json({ error: { "email": "Email Invalid! Please provide a valid Email!" } })
    }
    const userExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });
    if (userExist) {
      return res.status(400).json({ error: { "email": "Email Already exists!" } })
    }
    if (phoneExist) {
      return res.status(400).json({ error: { "phone": "This phone number is linked to another account, please enter another number." } })
    }
    async function generateUniqueAccountName(proposedName) {
      return User.findOne({ username: proposedName })
        .then(function (username) {
          if (username) {
            // console.log('no can do try again: ' + proposedName);
            proposedName += Math.floor((Math.random() * 100) + 1);
            return generateUniqueAccountName(proposedName); // <== return statement here
          }
          // console.log('proposed name is unique' + proposedName);
          return proposedName;
        })
        .catch(function (err) {
          next(err)
        });
    }
    const userName = await generateUniqueAccountName(username);
    if (!(phoneExist || userExist)) {
      const user = await User.create({
        email,
        username: userName,
        password,
        birthDate,
        gender,
        firstName,
        lastName,
        phone
      });
      const resData = await User.findOne({ _id: user._id }).select("-password")
      const data = {
        resData,
        token: genToken(resData?._id)
      }
      const options = {
        expires: new Date(new Date().getTime() + process.env.COOKIE_EXPIRES * 60 * 1000)
      }
      return res.status(201).cookie('user', data, options).json({
        message: 'Registration Successfully',
        data
      });
    }
  } catch (error) {
    next(error);
  }
};


module.exports.changedPassword = async (req, res) => {
  // console.log(req.body)
  const { oldPassword, password, password2 } = req.body;
  const user = await User.findOne({ _id: req?.user?._id });
  if (!(oldPassword && (await user.matchPassword(oldPassword)))) {
    return res.status(404).json({ error: "old password does not match!" });
  }
  if (!(password === password2)) {
    return res.status(403).json({ error: "new password and confirm password are not the same!" });
  }
  function checkPassword(password) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }
  if (!(checkPassword(password))) {
    return res.status(400).json({ error: { password: "password should contain min 8 letter password, with at least a symbol, upper and lower case" } })
  }
  if (oldPassword && (await user.matchPassword(oldPassword))) {
    user.password = password || user.password;
    const updatedPassword = await user.save();
    if (!updatedPassword) {
      return res.status(400).json({ error: "password change failed, please try again!" });
    } else {
      const resData = await User.findOne({ _id: user._id }).select("-password")
      const data = {
        resData,
        token: genToken(resData?._id)
      }
      const options = {
        expires: new Date(new Date().getTime() + process.env.COOKIE_EXPIRES * 60 * 1000)
      }
      return res.status(201).cookie('user', data, options).json({
        message: "You have successfully changes Password",
        data
      });
    }
  }
}

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ message: "user credentials invalid! please login!" });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};