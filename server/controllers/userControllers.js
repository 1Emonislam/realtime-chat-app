const User = require("../models/userModel");
const genToken = require("../utils/genToken");
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ message: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ message: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

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

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ message: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};