const Chat = require("../models/chatModel");
const ViewsChat = require("../models/ChatViewsModel");
const JoinGroup = require("../models/JoinGroupModel");
const Notification = require('../models/notificationModel')
const User = require("../models/userModel");
const { upload } = require("../utils/file");
const { mailSending } = require("../utils/func");
const { genToken, genInviteGroup } = require("../utils/genToken");

module.exports.acessChat = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
  }
  {
    const { userId } = req.body;
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
      }).sort("-updatedAt")
        .populate("members", "_id pic firstName lastName email")
        .populate("latestMessage");
      isChat = await User.populate(isChat, {
        path: "latesetMessage.sender",
        select: "_id pic firstName lastName email",
      });
      if (isChat?.length > 0) {
        return res.json(isChat[0]);
      } else {
        let chatData = {
          chatName: "sender",
          isGroupChat: false,
          members: [req.user._id, userId],
        };
        try {
          const createdChat = await Chat.create(chatData);
          const fullChat = await Chat.findOne({
            _id: createdChat._id,
          }).populate("members", "_id pic firstName lastName email");
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
module.exports.getChatMembers = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const getChatMember = await Chat.findOne({ _id: chatId}).populate("members", "_id pic firstName lastName email").populate("groupAdmin", "_id pic firstName lastName email")
    const data = {
      totalMember: getChatMember?.members?.length,
      chat: getChatMember?._id,
      members: getChatMember?.members,
      groupAdmin: getChatMember?.groupAdmin,
      amIJoined: getChatMember?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      amIAdmin: getChatMember?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString())
    }
    res.status(200).json(data);
  }
  catch (error) {
    next(error)
  }
}
module.exports.getChat = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
  }
  try {
    await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).sort("-updatedAt").populate("seen", "_id pic firstName lastName email").populate("members", "_id pic firstName lastName email").populate("latestMessage").populate("groupAdmin", "_id pic firstName lastName email").sort("-updatedAt").then(async (results) => {
      // console.log(results)
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "_id pic firstName lastName email"
      })
      return res.status(200).json({ data: results })
    })
  } catch (error) {
    next(error)
  }
};

module.exports.groupCreate = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { token: 'User Credentials expired! Please login' } })
  }
  let img;
  if (req?.body?.img) {
    const url = await upload(req?.body?.img);
    img = url.url;
  }
  try {
    const groupChat = await Chat.create({
      chatName: req.body.chatName,
      topic: req.body?.topic,
      status: req.body?.status,
      description: req.body?.description,
      isGroupChat: true,
      img: img || '',
      members: [req?.user?._id],
      groupAdmin: req?.user?._id,
    });

    if (groupChat) {
      for (let i = 0; i < groupChat?.members?.length; i++) {
        await JoinGroup.create({
          joinChatId: groupChat?._id,
          userJoin: groupChat?.members[i]
        })
        // console.log(groupChat?.members[i])
        await Notification.create({
          receiver: groupChat?.members[i],
          type: 'group',
          subject: `added new group from ${groupChat?.chatName}`,
          message: `${req?.user?.firstName} ${req?.user?.lastName} added group`,
        })
      }
    }

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("members", "_id pic firstName lastName email").populate("groupAdmin", "_id pic firstName lastName email");
    const memberJoinedInfo = {
      joinMemberCount: fullGroupChat?.members?.length,
      showMemberFront: fullGroupChat?.members?.slice(0, 5)
    }
    return res.status(200).json({ message: `Create New Group ${groupChat?.chatName} ${groupChat?.status} Group Join Member ${groupChat?.members?.length}`, memberJoinedInfo, data: fullGroupChat })
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
module.exports.groupRename = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
  }
  const { chatId, chatName, topic, status, description, img } = req.body;
  try {
    const updatedChat = await Chat.findOneAndUpdate({ _id: chatId, groupAdmin: req?.user?._id }, {
      chatName, topic, status, description, img
    }, { new: true }).populate("members", "_id pic firstName lastName email").populate("groupAdmin", "_id pic firstName lastName email");
    if (!updatedChat) {
      return res.status(400).json({ error: { token: "you can perform only Admin Group Rename!" } });
    } if (updatedChat) {
      for (let i = 0; i < groupChat?.members?.length; i++) {
        await Notification.create({
          receiver: groupChat?.members[i],
          type: 'group',
          subject: `${groupChat?.chatName} group Rename  from current group name ${updatedChat?.chatName}`,
          message: ` ${req?.user?.firstName} ${req?.user?.lastName} Group Rename`,
        })
      }
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
      return res.status(400).json({ error: { members: "Already Members This Group" } })
    }
    const added = await Chat.findByIdAndUpdate(chatId, {
      $addToSet: { members: userId },
    }, { new: true }).populate("members", "_id pic firstName lastName email").populate("groupAdmin", "_id pic firstName lastName email");
    // console.log(added)
    if (!added) {
      return res.status(404).json({ error: { "notfound": "chat not founds!" }, data: [] });
    }
    if (added) {
      const newMember = User.findOne({ _id: userId });
      await Notification.create({
        receiver: userId,
        type: 'group',
        subject: ` group added new member ${newMember?.firstName}`,
        message: `${req?.user?.firstName} ${req?.user?.lastName} added new member ${newMember?.firstName} ${newMember?.lastName}`,
      })
      await JoinGroup.create({
        joinChatId: chatId,
        userJoin: userId
      })
      const memberJoinedInfo = {
        joinMemberCount: added?.members?.length,
        showMemberFront: added?.members?.slice(0, 5)
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
      return res.status(400).json({ error: { invite: "Gen Invite Link expired! please provide valid Chat Group" } });
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
          return res.status(200).json({ message: 'You have invited link sent successfully', inviteId, token })
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
    }, { new: true }).populate("members", "_id pic firstName lastName email").populate("groupAdmin", "_id pic firstName lastName email");
    if (!remove) {
      return res.status(404).json({ error: { "notfound": "member not founds!" } });
    }
    if (remove) {
      await JoinGroup.find({
        joinChatId: chatId,
        userJoin: userId
      }).remove();
      const member = await User.find({ _id: userId });
      await Notification.create({
        receiver: userId,
        type: 'group',
        subject: `${groupChat?.chatName} group member remove`,
        message: `${req?.user?.firstName} ${req?.user?.lastName} to Group member remove ${member?.firstName} ${member?.lastName}`,
      })
      return res.status(200).json({ message: "removed successfully!", data: remove })
    }
  }
  catch (error) {
    next(error)
  }
}

