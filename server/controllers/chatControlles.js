const Chat = require("../models/chatModel");
const ViewsChat = require("../models/ChatViewsModel");
const JoinGroup = require("../models/JoinGroupModel");
const User = require("../models/userModel");
const moment = require('moment')
const { upload } = require("../utils/file");
const { mailSending } = require("../utils/func");
const { genToken, genInviteGroup } = require("../utils/genToken");
const GroupNotification = require("../models/groupNotificationModel");
const Message = require("../models/messageModel");

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
        .populate("members", "_id pic firstName lastName email online lastOnline createdAt")
        .populate("latestMessage").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt")
      isChat = await User.populate(isChat, {
        path: "latesetMessage.sender",
        select: "_id pic firstName lastName email online lastOnline createdAt",
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
          }).populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate("sender", "_id pic firstName lastName email online lastOnline createdAt").populate("latestMessage")
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
module.exports.getSingleChatMembers = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    let getChatMember = await Chat.findOne({ _id: chatId }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt");
    // console.log(getChatMember?.seen)
    await Chat.findOneAndUpdate({ _id: chatId }, {
      lastActive: new Date(),
      $addToSet: { seen: req.user?._id }
    }, { new: true })
    await GroupNotification.updateMany({ chat: chatId, receiver: req.user?._id }, {
      seen: true,
      lastSeen: new Date
    })
    const data = {
      data: getChatMember,
      amIJoined: getChatMember?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      amIAdmin: getChatMember?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
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
    const { status, page = 1, limit = 10 } = req.query;
    if (status == 'recent') {
      const latest = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).limit(limit * 1)
        .skip((page - 1) * limit).sort("-updatedAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("latestMessage").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: "latestMessage.sender",
          select: "_id pic firstName lastName email online lastOnline createdAt"
        })
      return res.status(200).json({ data: latest })
    }
    if (status == 'latest') {
      const latest = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).limit(limit * 1)
        .skip((page - 1) * limit).sort("-createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("latestMessage").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: "latestMessage.sender",
          select: "_id pic firstName lastName email online lastOnline createdAt"
        })
      return res.status(200).json({ data: latest })
    }
    if (status == 'popular' || 'acc') {
      const latest = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).limit(limit * 1)
        .skip((page - 1) * limit).sort("-members").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("latestMessage").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: "latestMessage.sender",
          select: "_id pic firstName lastName email online lastOnline createdAt"
        })
      return res.status(200).json({ data: latest })
    }
    if (status == 'oldChat' || 'dec') {
      const latest = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).limit(limit * 1)
        .skip((page - 1) * limit).sort("createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("latestMessage").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: "latestMessage.sender",
          select: "_id pic firstName lastName email online lastOnline createdAt"
        })
      return res.status(200).json({ data: latest })
    }
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
    const fullGroupChat = await Chat.find({ members: req.user?._id }).populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt");
    return res.status(200).json({ message: `Create New Group ${groupChat?.chatName} ${groupChat?.status} Group Join Member ${groupChat?.members?.length}`, data: fullGroupChat })
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
    }, { new: true }).populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt");
    if (!updatedChat) {
      return res.status(400).json({ error: { token: "you can perform only Admin Group Rename!" } });
    } if (updatedChat) {
      for (let i = 0; i < updatedChat?.members?.length; i++) {
        await GroupNotification.create({
          receiver: updatedChat?.members[i],
          type: 'group',
          chat: updatedChat?._id,
          subject: `${updatedChat?.chatName} group Rename  from updated name ${updatedChat?.chatName}`,
          text: ` ${req?.user?.firstName} ${req?.user?.lastName} Group Rename`,
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
    }, { new: true }).populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt");
    // console.log(added)
    if (!added) {
      return res.status(404).json({ error: { "notfound": "chat not exists!" } });
    }
    let getChatMember = await Chat.findOne({ _id: added?._id }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt");
    const data = {
      data: getChatMember,
      amIJoined: getChatMember?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      amIAdmin: getChatMember?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
    }

    if (userId?.length) {
      for (const member of userId) {
        const user = await User.findOne({ _id: member });
        await GroupNotification.create({
          receiver: member,
          type: 'group',
          chat: added?._id,
          subject: ` ${user?.firstName + ' ' + user?.lastName} added New member ${added?.chatName} group`,
          text: ` ${added?.chatName} Group Member`,
        })
        await JoinGroup.create({
          joinChatId: chatId,
          userJoin: member
        })
      }
    } else {
      await JoinGroup.create({
        joinChatId: chatId,
        userJoin: userId
      })
    }
    const memberJoinedInfo = {
      joinMemberCount: added?.members?.length,
      showMemberFront: added?.members
    }
    return res.status(200).json({ message: `${userId?.length !== 0 && userId?.length} new member added successfully!`, memberJoinedInfo, data })
  }
  catch (error) {
    next(error)
  }
}
module.exports.groupInviteAccept = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
  }
  const { chatId, userId, invitedPerson, declined } = req.body;
  // console.log(invitedPerson)
  try {
    const exist = await Chat.findOne({ _id: chatId, members: userId });
    if (exist) {
      return res.status(400).json({ error: { members: "You Have Already Joined Member" } })
    }
    if (!invitedPerson) {
      return res.status(400).json({ error: { email: 'Invitation Expired!' } })
    }
    if (declined) {
      const newMember = await User.findOne({ _id: userId });
      if (newMember) {
        await GroupNotification.create({
          receiver: invitedPerson,
          type: 'group',
          chat: exist?._id,
          subject: `${exist?.chatName} group Invitation request declined ${newMember?.firstName + ' ' + newMember?.lastName}`,
          text: `Invitation request declined ${newMember?.firstName} ${newMember?.lastName}`,
        })
        return res.status(200).json({ message: " group Invitation request declined!" })
      }
    }
    const added = await Chat.findByIdAndUpdate(chatId, {
      $addToSet: { members: userId },
    }, { new: true }).populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt");
    // console.log(added)
    if (!added) {
      return res.status(404).json({ error: { "notfound": "chat not founds!" }, data: [] });
    }
    if (added) {
      const newMember = await User.findOne({ _id: userId });
      if (newMember) {
        await GroupNotification.create({
          receiver: invitedPerson,
          type: 'group',
          chat: added?._id,
          subject: `${added?.chatName} group Invitation request accepted ${newMember?.firstName + ' ' + newMember?.lastName}`,
          text: `you have added to new member ${newMember?.firstName} ${newMember?.lastName}`,
        })
        await JoinGroup.create({
          joinChatId: chatId,
          userJoin: userId
        })
      }
      const memberJoinedInfo = {
        joinMemberCount: added?.members?.length,
        showMemberFront: added?.members
      }
      return res.status(200).json({ message: "Member added successfully!", memberJoinedInfo, data: added })
    }
  }
  catch (error) {
    next(error)
  }
}
module.exports.groupAddToInviteSent = async (req, res, next) => {
  if (!req.user?._id) {
    return res.status(400).json({ error: { invite: "Credentials expired! please login" } });
  }
  try {
    const { chatId, email, expire } = req.body;
    const chatGroup = await Chat.findOne({ _id: chatId }).populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt");
    if (!chatGroup) {
      return res.status(400).json({ error: { invite: "Gen Invite Link expired! please provide valid Chat Group" } });
    }
    const data = {
      chat: {
        _id: chatGroup?._id,
        chatName: chatGroup?.chatName,
        members: chatGroup?.members,
        img: chatGroup?.img
      },
      invitePerson: {
        _id: req.user?._id,
        firstName: req.user?.firstName,
        lastName: req.user?.lastName,
        pic: req.user?.pic,
      },
    }
    const token = genInviteGroup(data, expire);
    const link = `https://collaball.netlify.app/group/invite/${token}`;
    if (!email?.length) {
      return res.status(200).json({ data: link, msg: `group ${chatGroup.chatName} attend to join` });
    }
    if (email?.length) {
      const mailInfo = {
        subject: `${req?.user?.firstName} ${req?.user?.lastName} invited you to join`,
        msg: `${chatGroup.chatName}`,
        chat: chatGroup?._id,
        date: moment().format(),
        link: link
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
                          href="https://collaballapp.herokuapp.com/"
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
                                  color: white;
                                  text-transform: uppercase;
                                  font-size: 14px;
                                  padding: 10px 24px;
                                  display: inline-block;
                                  border-radius: 50px;
                                ">Accept Invite</a
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
      if (email?.length) {
        const sending = await mailSending(email, mailInfo, htmlMSG);
        if (sending === true) {
          return res.status(200).json({ message: 'Invitation Link Successfully Sent Via Email', link: link, msg: `group ${chatGroup.chatName} attend to join` })
        }
      }
    }
  }
  catch (error) {
    next(error)
  }
}

module.exports.singleGroupDelete = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    const chat = await Chat.findOne({ _id: chatId })
    if (!chat) {
      return res.status(400).json({ error: { group: 'group not exists!' } })
    }
    if (chat) {
      const removed = await Chat.findOneAndRemove({ _id: chat?._id, groupAdmin: req?.user?._id })
      if (!removed) {
        return res.status(400).json({ error: { group: 'Permission Denied! you can perform only group admin!' } })
      }
      if (removed) {
        await JoinGroup.deleteMany({
          joinChatId: chatId,
        });
        await Message.deleteMany({
          chat: chatId,
        });
        await GroupNotification.deleteMany({
          chat: chatId,
        });
        const data = await Chat.find({ members: req.user?._id }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt");
        return res.status(200).json({ message: 'group removed Successfully', data })
      }
    }
  }
  catch (error) {
    next(error)
  }
}
const inviteLinkVerify = async (req, res, next) => {
  try {

  }
  catch (error) {
    next(error)
  }
}

module.exports.groupMemberRemoveTo = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
  }
  const { chatId, userId } = req.body;
  // console.log(chatId, userId)
  try {
    const remove = await Chat.findOneAndUpdate({ _id: chatId, groupAdmin: req?.user?._id }, {
      $pull: { members: userId },
    }, { new: true });
    if (!remove) {
      return res.status(404).json({ error: { "isAdmin": "Permission Denied You can perform only admin" } });
    }
    if (remove) {
      let getChatMember = await Chat.findOne({ _id: chatId }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate("members", "_id pic firstName lastName email online lastOnline createdAt").populate("groupAdmin", "_id pic firstName lastName email online lastOnline createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt");
      const data = {
        data: getChatMember,
        amIJoined: getChatMember?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
        amIAdmin: getChatMember?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      }
      await JoinGroup.deleteMany({
        joinChatId: chatId,
        userJoin: userId
      });
      return res.status(200).json({ message: "removed successfully!", data })
    }
  }
  catch (error) {
    next(error)
  }
}
