const config = { ...require("../config/mail"), ...require("../config") };
const nodemailer = require("nodemailer");
// const { google } = require("googleapis")
const jwt = require("jsonwebtoken");
const LoginSession = require("../models/loginSession");
const User = require("../models/userModel");
function generate_jwt_token(user) {
	const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
		expiresIn: '7d',
	});
	return token;
};

function verify_token(token) {
	return jwt.verify(token, config.JWT_SECRET);
}

function generate_token(length) {
	const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
	const b = [];
	for (let i = 0; i < length; i++) {
		let j = (Math.random() * (a.length - 1)).toFixed(0);
		b[i] = a[j];
	}
	return b.join("");
}
// const oAuth2Client = new google.auth.OAuth2(config.gmail_client_id, config.gmail_client_secret, config.gmail_redirect_uri)
// oAuth2Client.setCredentials({ refresh_token: config.gmail_refresh_token })
async function mailSending(sentTo, mailInfo, htmlMSG) {
	try {
		// type: 'OAuth2',
		// user: config.admin_sender_email,
		// clientId: config.gmail_client_id,
		// clientSecret: config.gmail_client_secret,
		// refresh_token: config.gmail_refresh_token,
		// accessToken: accessToken
		// const accessToken = await oAuth2Client.getAccessToken();
		const option = {
			service: config.gmail_host,
			auth: {
				user: config.admin_sender_email,
				pass: config.gmail_password
			}
		}
		const transporter = nodemailer.createTransport(option);
		const mailOptions = {
			from: `Collaball <${config.admin_sender_email}>`,
			to: sentTo,
			subject: mailInfo.subject,
			html: htmlMSG,
		};
		await transporter.sendMail(mailOptions);
		// console.log(transporter)
		return true;
	} catch (error) {
		return false;
	}

}

async function codeSaveDBandSend(userData, subject, plainTextMsg, codeName, sendMethod) {
	try {
		// the Random generate code
		let theCode = Math.floor(100000 + Math.random() * 900000);

		if (codeName === "forget_code") {
			theCode = Math.floor(1000 + Math.random() * 9000);
		}

		const currentEpochTime = Date.now();
		const codeExpireTime = currentEpochTime + 900 * 1000; // 15 minutes

		// prettier-ignore
		let saveCode;
		let sendRes = {};
		if (codeName === "forget_code") {
			saveCode = await User.updateOne(
				{ _id: userData._id },
				{
					"forgetCode.code": theCode,
					"forgetCode.codeExpireTime": codeExpireTime,
					"forgetCode.wrongTry": 0,
					"forgetCode.used": false,
					"forgetCode.worked": false,
				}
			);

			if (sendMethod === "phone") {
				console.log("Phone");
				const sentTo = userData.phone;
				const messageTxt = `${plainTextMsg} ${theCode}`;
				sendRes = await sendSMS(messageTxt, sentTo);
			} else {
				// console.log("Email");
				// code sending Body
				const sentTo = userData.email;
				subject = subject;
				themMailMsg = `<div style="width: 100%; font-size: 15px; line-height: 21px; color: rgb(20, 24, 35); font-family: arial, sans-serif;">
                                <div style="margin-top: 16px; margin-bottom: 20px;">Hi ${`${userData.firstName} ${userData.lastName}`},</div>
                                <p style="color: rgb(109, 109, 108);">${plainTextMsg}</p>
                                <span style="color: rgb(20, 24, 35); background: rgb(231, 243, 255); display: inline-block; padding: 14px 32px; border: 1px solid rgb(24, 119, 242); border-radius: 7px; font-size: 17px; font-family: Roboto; font-weight: 700;">${theCode}</span>
                            </div>`;
				try {
					await mailSending(sentTo, subject, themMailMsg);
					// console.log(`message has ben delivered to ${sentTo}`);
					sendRes.accepted = true;
				} catch (error) {
					sendRes.accepted = false;
				}
			}
		} else {
			if (sendMethod === "phone") {
				saveCode = await User.updateOne(
					{ _id: userData._id },
					{
						"phoneVerifyCode.code": theCode,
						"phoneVerifyCode.codeExpireTime": codeExpireTime,
						"phoneVerifyCode.wrongTry": 0,
						"phoneVerifyCode.used": false,
					}
				);

				if (saveCode.nModified) {
					const sentTo = userData.phone;
					const messageTxt = `${plainTextMsg} ${theCode}`;
					sendRes = await sendSMS(messageTxt, sentTo);
				}
			} else {
				saveCode = await User.updateOne(
					{ _id: userData._id },
					{
						"emailVerifyCode.code": theCode,
						"emailVerifyCode.codeExpireTime": codeExpireTime,
						"emailVerifyCode.wrongTry": 0,
						"emailVerifyCode.used": false,
					}
				);

				// code sending Body
				const sentTo = userData.email;
				subject = subject;
				themMailMsg = `<div style="width: 100%; font-size: 15px; line-height: 21px; color: rgb(20, 24, 35); font-family: arial, sans-serif;">
                                <div style="margin-top: 16px; margin-bottom: 20px;">Hi ${`${userData.firstName} ${userData.lastName}`},</div>
                                <p style="color: rgb(109, 109, 108);">${plainTextMsg}</p>
                                <span style="color: rgb(20, 24, 35); background: rgb(231, 243, 255); display: inline-block; padding: 14px 32px; border: 1px solid rgb(24, 119, 242); border-radius: 7px; font-size: 17px; font-family: Roboto; font-weight: 700;">${theCode}</span>
                            </div>`;
				try {
					await mailSending(sentTo, subject, themMailMsg);
					sendRes.accepted = true;
				} catch (error) {
					sendRes.accepted = false;
				}
			}
		}

		return sendRes;
	} catch (err) {
		console.log(err);
	}
}

async function doLogin(next, userData, keepLogged, directLogin) {
	try {
		const currentEpochTime = Date.now();
		const sessionName = "access_token";
		const sessionToken = generate_token(64);

		// how long age of the session in milliseconds
		if (keepLogged) {
			var timeLength = 60 * 60 * 24 * 30 * 1000;
			var howLongAge = currentEpochTime + timeLength; // 30 days cookie
		} else {
			timeLength = 43200 * 1000;
			howLongAge = currentEpochTime + timeLength; // 12 hours session
		}
		let theCode = Math.floor(100000 + Math.random() * 900000);
		const loginSessionInsertStructure = new LoginSession({
			userObjId: userData._id,
			twoStepVerified: directLogin ? true : false,
			twoStepVerifyCode: {
				code: theCode,
				expire: currentEpochTime + 60 * 10 * 1000,
			},
			sessionName,
			sessionToken,
			createTime: currentEpochTime,
			expireTime: howLongAge,
		});

		const saveLoginSessionData = await loginSessionInsertStructure.save();
		const token = generate_jwt_token(userData);
		let sendRes = {};

		const plainTextMsg = "Please Enter the login authentication code!";
		if (saveLoginSessionData) {
			if (directLogin) {
				sendRes.accepted = true;
				sendRes.sessionId = sessionToken;
				sendRes.token = token
			} else {
				const codeSendMethod = "email";
				if (codeSendMethod === "phone") {
					const sentTo = userData.phone;
					const messageTxt = `${plainTextMsg} ${theCode}`;
					sendRes = await sendSMS(messageTxt, sentTo);
				} else {
					// code sending Body
					const sentTo = userData.email;
					const subject = "2 Step verification code!";

					themMailMsg = `<div style="width: 100%; font-size: 15px; line-height: 21px; color: rgb(20, 24, 35); font-family: arial, sans-serif;">
							<div style="margin-top: 16px; margin-bottom: 20px;">Hi ${`${userData.firstName} ${userData.lastName}`},</div>
							<p style="color: rgb(109, 109, 108);">${plainTextMsg}</p>
							<span style="color: rgb(20, 24, 35); background: rgb(231, 243, 255); display: inline-block; padding: 14px 32px; border: 1px solid rgb(24, 119, 242); border-radius: 7px; font-size: 17px; font-family: Roboto; font-weight: 700;">${theCode}</span>
						</div>`;

					sendRes = await mailSending(sentTo, subject, themMailMsg);
				}

				sendRes.sessionId = saveLoginSessionData._id;
			}

			return sendRes;
		} else {
			throw new Error("Failed to save Login cookie to Database when Login");
		}
	} catch (err) {
		next(err);
	}
}

module.exports = { generate_token, mailSending, codeSaveDBandSend, doLogin, verify_token };