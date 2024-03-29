const GroupNotification = require("../models/groupNotificationModel");
const User = require("../models/userModel");
const { upload } = require("../utils/file");
const { mailSending } = require("../utils/func");
const { genToken_fourHours, genToken } = require("../utils/genToken");
module.exports.userLogin = async (req, res, next) => {
  const email = req?.body?.email?.toLowerCase();
  const phone = req?.body?.phone;
  const username = req?.body?.username?.toLowerCase();
  const password = req?.body?.password;
  // console.log(req.body)
  if (!(email || phone || username)) {
    return res.status(400).json({ error: { "email": "Could not find user Please provide Email or Phone Number or UserName" } })
  }
  let user = await User.findOne({ username: username }) ? await User.findOne({ username: username }) : await User.findOne({ email: email })
  if (user === null) {
    user = await User.findOne({ phone: phone })
  }
  // console.log(user)
  try {
    if (!user) {
      return res.status(400).json({ error: { "email": "Could not find user" } })
    }
    if (!(user && (await user.matchPassword(password)))) {
      return res.status(400).json({ error: { "password": "Password invalid! please provide valid password!" } });
    } else if (user && (await user.matchPassword(password))) {
      const resData = await User.findOne({ _id: user?._id }).select("-password");
      const userData = {};
      userData.user = resData;
      userData.token = genToken(resData?._id);
      const data = {
        data: resData,
        token: genToken(resData?._id)
      }
      var date = new Date();
      date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
      const options = {
        expires: date, httpOnly: true
      }
      return res.status(200).cookie('userCureent', data, options).json({
        message: 'Login Successfully',
        data: userData
      });
    }
  }
  catch (error) {
    next(error)
  }
}

module.exports.updateProfile = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: "User Credentials expired! Please login" } });
  }
  let { email, firstName, lastName, phone, nickName, birthDate, pic, userInfo, gender } = req.body;
  if (pic) {
    const { secure_url } = await upload(pic)
    pic = secure_url;
  }
  const latitude = req?.body?.location?.latitude || 0;
  const longitude = req?.body?.location?.longitude || 0;
  const address = req?.body?.location?.address;
  const information = req?.body?.location?.information;
  try {
    const profileUpdate = await User.findOneAndUpdate({ _id: req.user?._id }, {
      firstName, lastName, email, phone, gender, birthDate, nickName, userInfo, phone, pic, location: { latitude, longitude, address, information }, geometry: { type: "Point", "coordinates": [Number(longitude), Number(latitude)] }
    }, { new: true }).select("-password");
    const userData = {};
    userData.user = profileUpdate;
    userData.token = genToken(profileUpdate?._id);
    const data = {
      data: profileUpdate,
      token: genToken(profileUpdate?._id)
    }
    var date = new Date();
    date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
    const options = {
      expires: date, httpOnly: true
    }
    return res.status(200).cookie('userCurrent', data, options).json({
      message: 'Profile Update Successfully',
      data: userData,
    });
  }
  catch (error) {
    next(error)
  }
}

module.exports.currentProfileGet = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: "User Credentials expired! Please login" } });
  }
  try {
    const userData = {};
    userData.user = req?.user;
    userData.token = genToken(req?.user?._id);
    const data = {
      data: req?.user,
      token: genToken(req?.user?._id)
    }
    var date = new Date();
    date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
    const options = {
      expires: date, httpOnly: true
    }
    return res.status(200).cookie('userCurrent', data, options).json({
      message: 'My Profile',
      data: userData,
    });
  }
  catch (error) {
    next(error)
  }
}
module.exports.singleProfileGet = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: "User Credentials expired! Please login" } });
  }
  try {
    const profile = await User.findOne({ _id: req.params?.id })
    return res.status(200).json({
      message: 'Selected Profile',
      data: { data: profile }
    });
  }
  catch (error) {
    next(error)
  }
}
module.exports.userRegister = async (req, res, next) => {
  try {
    let { email, firstName, lastName, phone, birthDate, nickName, pic, userInfo, gender, password } = req.body;
    const latitude = req?.body?.location?.latitude || 0;
    const longitude = req?.body?.location?.longitude || 0;
    const address = req?.body?.location?.address;
    const information = req?.body?.location?.information;
    const username = (firstName + lastName)?.toString();
    const issue = {}
    const userExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });
    function checkPassword(password) {
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(password);
    }
    if (!(checkPassword(password))) {
      issue.password = 'Password should contain min 8 letter password, with at least a symbol, upper and lower case'
    }
    function validateEmail(elementValue) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(elementValue);
    }
    if (userExist) {
      issue.email = 'user Already exists!'
    }
    if (!(validateEmail(email))) {
      issue.email = 'Email Invalid! Please provide a valid Email!'
    }
    if (phoneExist) {
      issue.phone = 'This phone number is linked to another account, please enter another number.'
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
    if (Object.keys(issue)?.length) {
      return res.status(400).json({ error: issue })
    }
    const userName = await generateUniqueAccountName(username);
    if (!(phoneExist || userExist)) {
      const user = await User.create({
        username: userName,
        password,
        firstName, lastName, email, phone, nickName, gender, birthDate, userInfo, phone, pic, location: { latitude, longitude, address, information }, geometry: { type: "Point", "coordinates": [Number(longitude), Number(latitude)] }
      });
      const resData = await User.findOne({ _id: user._id }).select("-password");
      const userData = {};
      userData.user = resData;
      userData.token = genToken(resData?._id);
      const data = {
        data: resData,
        token: genToken(resData?._id)
      }
      var date = new Date();
      date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
      const options = {
        expires: date, httpOnly: true
      }
      await GroupNotification.create({
        receiver: user?._id,
        type: 'group',
        seen: false,
        subject: `Hello ${user?.firstName}  ${user?.lastName} Congratulations! Registration Successfully`,
        sender: user?._id,
      })
      return res.status(201).cookie('userCurrent', data, options).json({
        message: 'Registration Successfully',
        data: userData,
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
  const issue = {}
  if (!(password === password2)) {
    issue.password2 = 'New Password and Confirm Password are not the same!'
  }
  function checkPassword(password) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }
  if (!(checkPassword(password))) {
    issue.password = "Password should contain min 8 letter password, with at least a symbol, upper and lower case";
  }
  if (!(oldPassword && (await user?.matchPassword(oldPassword)))) {
    issue.password = 'old password does not match!'
  }
  if (Object.keys(issue)?.length) {
    return res.status(400).json({ error: issue })
  }
  if (oldPassword && (await user.matchPassword(oldPassword))) {
    user.password = password;
    const updatedPassword = await user.save();
    if (!updatedPassword) {
      return res.status(400).json({ error: { password: 'Password change failed, please try again!' } })
    } else {
      const resData = await User.findOne({ _id: user._id }).select("-password");
      const userData = {};
      userData.user = resData;
      userData.token = genToken(resData?._id);
      const mailInfo = {
        subject: `Check your account privacy. You have recently changed your password`,
        msg: `Check your account privacy. You have recently changed your password`,
        user: user,
        date: moment().format(),
        link: `https://chalechat.herokuapp.com`
      }
      const htmlMSG = `<!DOCTYPE html>
  <html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>${mailInfo?.subject}</title>
    <meta name="description" content="${mailInfo?.subject}" />
  </head>
  <body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="
        @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
        font-family: 'Open Sans', sans-serif;
      "
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <a
                  href="https://chalechat.herokuapp.com/"
                  title="logo"
                  target="_blank"
                >
                  <img
                    src="https://collaball.github.io/images/collaball_logo.png"
                    width="60px"
                    height="60px"
                    title="logo"
                    alt="logo"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 670px;
                    background: transparent;
                    border-radius: 3px;
                    text-align: center;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  "
                >
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                    <h3>Hello Dear,${mailInfo?.user?.firstName}</h3>
                    Date ${mailInfo?.date}
                    <br/>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                      ${mailInfo.msg}
                      </p>
                      <h4
                        style="
                          color: #1e1e2d;
                          font-weight: 500;
                          margin: 0;
                          font-size: 32px;
                          font-family: 'Rubik', sans-serif;
                        "
                      >
                        ${mailInfo?.subject}
                      </h4>
                      <a
                        href="${mailInfo?.link}"
                        style="
                          background: #20e277;
                          text-decoration: none !important;
                          font-weight: 500;
                          margin-top: 35px;
                          color: transparent;
                          text-transform: uppercase;
                          font-size: 14px;
                          padding: 10px 24px;
                          display: inline-block;
                          border-radius: 50px;
                        "
                        >Back Collaball</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <p
                  style="
                    font-size: 14px;
                    color: rgba(69, 80, 86, 0.7411764705882353);
                    line-height: 18px;
                    margin: 0 0 0;
                  "
                >
                  &copy; <strong>Collaball.com</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

      // `https://wesoftin.com/user/verify-email/${(genToken_fourHours(userExist._id?.toString())}
      await mailSending(user?.email, mailInfo, htmlMSG);
      const data = {
        data: resData,
        token: genToken(resData?._id)
      }
      var date = new Date();
      date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
      const options = {
        expires: date, httpOnly: true
      }
      return res.status(200).cookie('userCurrent', data, options).json({
        message: "Password has been successfully changed",
        data: userData,
      });
    }
  }
}

module.exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const issue = {};
  if (!email) {
    issue.email = "Email invalid Please Provide valid Email"
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      issue.email = 'Could not find user!'
    }
    if (Object.keys(issue)?.length) {
      return res.status(400).json({ error: issue })
    }
    const data = {
      data: user,
      token: genToken(user?._id)
    }
    var date = new Date();
    date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
    const options = {
      expires: date, httpOnly: true
    }
    res.cookie('userCureent', data, options)
    const mailInfo = {
      subject: `You have
      requested to reset your password Collaball account`,
      msg: `We cannot simply send you your old password. A unique link to reset your
      password has been generated for you. To reset your password, click the
      following link and follow the instructions.`,
      user: user,
      date: moment().format(),
      link: `https://chalechat.herokuapp.com/reset-password/${genToken_fourHours(user?._id)}`
    }
    const htmlMSG = `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <title>${mailInfo?.subject}</title>
  <meta name="description" content="${mailInfo?.subject}" />
</head>
<body
  marginheight="0"
  topmargin="0"
  marginwidth="0"
  style="margin: 0px; background-color: #f2f3f8"
  leftmargin="0"
>
  <table
    cellspacing="0"
    border="0"
    cellpadding="0"
    width="100%"
    bgcolor="#f2f3f8"
    style="
      @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
      font-family: 'Open Sans', sans-serif;
    "
  >
    <tr>
      <td>
        <table
          style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
          width="100%"
          border="0"
          align="center"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <td style="height: 80px">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align: center">
              <a
                href="https://chalechat.herokuapp.com/"
                title="logo"
                target="_blank"
              >
                <img
                  src="https://collaball.github.io/images/collaball_logo.png"
                  width="60px"
                  height="60px"
                  title="logo"
                  alt="logo"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td style="height: 20px">&nbsp;</td>
          </tr>
          <tr>
            <td>
              <table
                width="95%"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 670px;
                  background: transparent;
                  border-radius: 3px;
                  text-align: center;
                  -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                "
              >
                <tr>
                  <td style="height: 40px">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding: 0 35px">
                  <h3>Hello Dear,${mailInfo?.user?.firstName}</h3>
                  Date ${mailInfo?.date}
                  <br/>
                    <p
                      style="
                        color: #455056;
                        font-size: 15px;
                        line-height: 24px;
                        margin: 0;
                      "
                    >
                    ${mailInfo.msg}
                    </p>
                    <h4
                      style="
                        color: #1e1e2d;
                        font-weight: 500;
                        margin: 0;
                        font-size: 32px;
                        font-family: 'Rubik', sans-serif;
                      "
                    >
                      ${mailInfo?.subject}
                    </h4>
                    <a
                      href="${mailInfo?.link}"
                      style="
                        background: #20e277;
                        text-decoration: none !important;
                        font-weight: 500;
                        margin-top: 35px;
                        color: transparent;
                        text-transform: uppercase;
                        font-size: 14px;
                        padding: 10px 24px;
                        display: inline-block;
                        border-radius: 50px;
                      "
                      >Reset
                      Password</a
                    >
                  </td>
                </tr>
                <tr>
                  <td style="height: 40px">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="height: 20px">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align: center">
              <p
                style="
                  font-size: 14px;
                  color: rgba(69, 80, 86, 0.7411764705882353);
                  line-height: 18px;
                  margin: 0 0 0;
                "
              >
                &copy; <strong>Collaball.com</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="height: 80px">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    const sending = await mailSending(user?.email, mailInfo, htmlMSG);
    // console.log(sending)
    if (sending === true) {
      return res.status(200).json({ message: 'Password reset email successfully send! Please check your email inbox or spam folder' })
    }
    if (sending === false) {
      return res.status(200).json({ error: { email: "Password reset email sending failed! please try again!" } })
    }

  }
  catch (error) {
    next(error)
  }
}
module.exports.logOut = (req, res, next) => {
  try {
    if (!req.user?._id) return res.json({ error: "You are not a login User Please log in Before log out!" });
    // onlineUsers.delete(req.params.id);
    return res.status(200).clearCookie('userCurrent').json({ message: "You have successfully Log Out!", data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports.resetPassword = async (req, res) => {
  const { password, password2 } = req.body;
  const user = await User.findOne(req?.user?._id);
  // console.log(user)
  const issue = {};
  if (!user) {
    issue.email = 'user credentials invalid!'
  }
  if (!password) {
    issue.password = 'Invalid Password Please provide valid password'
  }
  if (!(password === password2)) {
    issue.password2 = 'Password does not match New Password And Confirm Password'
  }
  function checkPassword(password) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }
  if (!(checkPassword(password))) {
    issue.password = "Password should contain min 8 letter password, with at least a symbol, upper and lower case"
  }
  if (Object.keys(issue)?.length) {
    return res.status(400).json({ error: issue })
  }
  if (user) {
    user.password = password;
    const resetPass = await user.save();
    resetPass.save().then(savedDoc => {
      const userData = {};
      delete resetPass.password;
      userData.user = resetPass;
      userData.token = genToken(resetPass?._id);
      //password saving
      if (savedDoc === resetPass) {
        user.token = genToken(user?._id);
        const data = {
          data: userData,
          token: genToken(user?._id)
        }
        var date = new Date();
        date.setTime(date.getTime() + (process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
        const options = {
          expires: date, httpOnly: true
        }
        return res.status(200).cookie('userCureent', data, options).json({ message: "You have successfully Reset your Password", data: userData })
      } else {
        return res.status(400).json({ error: { password: "Password Reset failed! please try again!" } });
      }
    })
  }
}

module.exports.allUserSearch = async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  limit = parseInt(limit)
  const keyword = req.query.search ? {
    $or: [
      { firstName: { $regex: req.query.search, $options: "i" } },
      { lastName: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
      { username: { $regex: req.query.search, $options: "i" } },
      { phone: { $regex: req.query.search, $options: "i" } },
    ],
  } : {};
  try {
    const users = await User.find(keyword).sort("-createdAt").find({ _id: { $ne: req.user?._id } }).limit(limit * 1)
      .skip((page - 1) * limit)
    const count = await User.find(keyword).sort("-createdAt").find({ _id: { $ne: req.user?._id } }).count()
    return res.status(200).json({ message: 'User Search list Founds', data: users, count: count })
  }
  catch (error) {
    next(error)
  }
}