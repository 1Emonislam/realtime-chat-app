const Chat = require("../models/chatModel");
const ViewsChat = require("../models/ChatViewsModel");
const JoinGroup = require("../models/JoinGroupModel");
const User = require("../models/userModel");
const { mailSending } = require("../utils/func");
const { genToken, genInviteGroup } = require("../utils/genToken");

module.exports.acessChat = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    {
        const { userId, img } = req.body;
        try {
            if (!userId) {
                console.log("user Id sent with requset");
                return res.status(400);
            }
            let isChat = await Chat.find({
                isGroupChat: false,
                $and: [
                    { members: { $elemMatch: { $eq: req.user._id } } },
                    { members: { $elemMatch: { $eq: userId } } },
                ],
            })
                .populate("members", "-password")
                .populate("latestMessage");
            isChat = await User.populate(isChat, {
                path: "latesetMessage.sender",
                select: "name pic email",
            });
            if (isChat?.length > 0) {
                return res.json(isChat[0]);
            } else {
                let chatData = {
                    chatName: "sender",
                    isGroupChat: false,
                    img: img,
                    members: [req.user._id, userId],
                };
                try {
                    const createdChat = await Chat.create(chatData);
                    const fullChat = await Chat.findOne({
                        _id: createdChat._id,
                    }).populate("members", "-password");
                    await ViewsChat.create({
                        viewsChatId: createdChat?._id,
                    })
                    const views = await ViewsChat.find({ viewsChatId: createdChat?._id }).count();
                    return res.status(200).json({ views, data: fullChat });
                } catch (error) {
                    next(error);
                }
            }
        } catch (error) {
            next(error);
        }
    }
};
module.exports.getChat = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    try {
        await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).populate("members", "-password").populate("latestMessage").populate("groupAdmin", "-password").sort({ updatedAt: -1 }).then(async (results) => {
            // console.log(results)
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email"
            })
            const viewsChatId = await Chat.findOne({ members: { $elemMatch: { $eq: req.user._id } } });
            await ViewsChat.create({
                viewsChatId: viewsChatId?._id,
            })
            const views = await ViewsChat.find({ viewsChatId: viewsChatId?._id }).count();
            return res.status(200).json({ views, data: results })
        })
    } catch (error) {
        next(error)
    }
};

module.exports.groupCreate = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    // console.log(req.body.members)
    if (!req.body.members || !req.body.chatName) {
        return res.status(400).json({ error: "Please Fill all the feilds! Members and ChatName" })
    }
    try {
        const groupChat = await Chat.create({
            chatName: req.body.chatName,
            isGroupChat: true,
            img: req.body?.img,
            members: [req?.user?._id, ...req?.body?.members],
            groupAdmin: req?.user?._id,
        });
        for (let i = 0; i < groupChat?.members?.length; i++) {
            await JoinGroup.create({
                joinChatId: groupChat?._id,
                userJoin: groupChat?.members[i]
            })
        }
        const fiveMemberShow = await Chat.findOne({ _id: groupChat?._id }).sort("createdAt").limit(5);
        const memberJoinedInfo = {
            joinMemberCount: groupChat?.members?.length,
            showMemberFront: fiveMemberShow ? fiveMemberShow : [],
        }
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("members", "-password").populate("groupAdmin", "-password");
        return res.status(200).json({ memberJoinedInfo, data: fullGroupChat })
    } catch (error) {
        error.status = 400;
        next(error);
    }
};
module.exports.groupRename = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, chatName } = req.body;
    try {
        const updatedChat = await Chat.findOneAndUpdate({ _id: chatId, groupAdmin: req?.user?._id }, {
            chatName, img: req?.body?.img
        }, { new: true }).populate("members", "-password").populate("groupAdmin", "-password");
        if (!updatedChat) {
            return res.status(400).json({ error: "you can perform only Admin Group Rename!" });
        } if (updatedChat) {
            return res.status(200).json({ message: "chat successfully updated!", data: updatedChat })
        }
    } catch (error) {
        next(error);
    }
};
module.exports.groupAddTo = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, userId } = req.body;
    try {
        const exist = await Chat.findOne({ _id: chatId, members: userId });
        if (exist) {
            return res.status(400).json({ error: "Already Members This Group" })
        }
        const added = await Chat.findByIdAndUpdate(chatId, {
            $addToSet: { members: userId },
        }, { new: true }).populate("members", "-password").populate("groupAdmin", "-password");
        // console.log(added)
        if (!added) {
            return res.status(404).json({ error: "chat not founds!", data: [] });
        }
        if (added) {
            await JoinGroup.create({
                joinChatId: chatId,
                userJoin: userId
            })
            const fiveMemberShow = await Chat.findOne({ _id: added?._id }).sort("createdAt").limit(5);
            const memberJoinedInfo = {
                joinMemberCount: added?.members?.length,
                showMemberFront: fiveMemberShow ? fiveMemberShow : [],
            }
            return res.status(200).json({ message: "Member added successfully!", memberJoinedInfo, data: added })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.groupAddToInviteSent = async (req, res, next) => {
    try {
        const { chatId, members, email, expire } = req.body;
        function inviteGenLink(length, id) {
            for (var s = ''; s.length < length; s += `${id}abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01`.charAt(Math.random() * 62 | 0));
            return s;
        }
        const chatGroup = await Chat.findOne({ _id: chatId });
        if (!chatGroup) {
            return res.status(400).json({ error: "Gen Invite Link expired! please provide valid Chat Group" });
        }
        const id = (chatGroup?._id + req.user?._id);
        const inviteId = `${inviteGenLink(13, id)}`;
        const token = genInviteGroup(chatGroup?._id, inviteId, members, expire);
        if (inviteId && token) {
            const mailInfo = {
                subject: `${req?.user?.firstName} ${req?.user?.lastName} invited you to join`,
                msg: `${chatGroup.chatName}`,
                chat: chatGroup,
                date: moment().format(),
                link: `https://collaball.netlify.app/group/invite/${token}}`
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
                          href="https://collaball.netlify.app/"
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
                            background: #fff;
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
                            <h3>${mailInfo?.subject}</h3>
                            Date ${mailInfo?.date}
                            <br/>
                              <h4
                                style="
                                  color: #455056;
                                  font-size: 15px;
                                  line-height: 24px;
                                  margin: 0;
                                "
                              >
                              <img
                              src="${mailInfo?.chat?.img}"
                              width="60px"
                              height="60px"
                              title="logo"
                              alt="logo"
                            />
                              ${mailInfo.msg}
                              </h4>
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
                                  color: #fff;
                                  text-transform: uppercase;
                                  font-size: 14px;
                                  padding: 10px 24px;
                                  display: inline-block;
                                  border-radius: 50px;
                                "
                                >Accept Invite</a
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

            // console.log(sending)
            if (email) {
                const sending = await mailSending(email, mailInfo, htmlMSG);
                if (sending === true) {
                    return res.status(200).json({ message: 'You have invited link send successfully', inviteId, token })
                }
            }
            return res.status(200).json({ inviteId, token });
        }
    }
    catch (error) {
        next(error)
    }

}
module.exports.groupRemoveTo = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, userId } = req.body;
    try {
        const remove = await Chat.findByIdAndUpdate(chatId, {
            $pull: { members: userId },
        }, { new: true }).populate("members", "-password").populate("groupAdmin", "-password");
        if (!remove) {
            return res.status(404).json({ error: "member not founds!" });
        }
        if (remove) return res.status(200).json({ message: "removed successfully!", data: remove })
    }
    catch (error) {
        next(error)
    }
}

