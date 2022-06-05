const Chat = require("../models/chatModel");
const ViewsChat = require("../models/ChatViewsModel");
const JoinGroup = require("../models/JoinGroupModel");
const User = require("../models/userModel");
const moment = require('moment')
const { upload } = require("../utils/file");
const { mailSending } = require("../utils/func");
const shortid = require('shortid');
const { genToken, genInviteGroup } = require("../utils/genToken");
const GroupNotification = require("../models/groupNotificationModel");
const Message = require("../models/messageModel");
const UploadFiles = require("../models/uploadFilesModel");
const Invitation = require("../models/InvitationModel");

module.exports.acessChat = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
  }
  const { userId } = req.body;
  let { page = 1, limit = 10 } = req.query;
  limit = parseInt(limit);
  const skip = parseInt(page - 1);
  const size = limit;
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
      .populate("latestMessage").populate({
        path: 'members',
        select: '_id pic firstName lastName email online lastOnline createdAt',
        model: 'User',
        options: {

          skip: skip,
          limit: size
        },
        match: {
          // filter result in case of multiple result in populate
          // may not useful in this case
        }
      }).populate({
        path: 'groupAdmin',
        select: '_id pic firstName lastName email online lastOnline createdAt',
        model: 'User',
        options: {

          skip: skip,
          limit: size
        },
        match: {
          // filter result in case of multiple result in populate
          // may not useful in this case
        }
      }).populate({
        path: 'seen',
        select: '_id pic firstName lastName email online lastOnline createdAt',
        model: 'User',
        options: {

          skip: skip,
          limit: size
        },
        match: {
          // filter result in case of multiple result in populate
          // may not useful in this case
        }
      })
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
        let fullChat = await Chat.findOne({
          _id: createdChat._id,
        }).populate({
          path: 'members',
          select: '_id pic firstName lastName email online lastOnline createdAt',
          model: 'User',
          options: {

            skip: skip,
            limit: size
          },
          match: {
            // filter result in case of multiple result in populate
            // may not useful in this case
          }
        }).populate({
          path: 'groupAdmin',
          select: '_id pic firstName lastName email online lastOnline createdAt',
          model: 'User',
          options: {

            skip: skip,
            limit: size
          },
          match: {
            // filter result in case of multiple result in populate
            // may not useful in this case
          }
        }).populate({
          path: 'seen',
          select: '_id pic firstName lastName email online lastOnline createdAt',
          model: 'User',
          options: {

            skip: skip,
            limit: size
          },
          match: {
            // filter result in case of multiple result in populate
            // may not useful in this case
          }
        }).populate("sender", "_id pic firstName lastName email online lastOnline createdAt").populate("latestMessage")
        fullChat = await UploadFiles.populate(fullChat, {
          path: 'content.files',
          select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
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
};
module.exports.getSingleChatMembers = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    let { page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const skip = parseInt(page - 1);
    const size = limit;
    // const numPage = skip * size;
    let getChatMember = await Chat.findOne({ _id: chatId }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    })
    getChatMember = await UploadFiles.populate(getChatMember, {
      path: 'content.files',
      select: '_id duration author filename sizeOfBytes type format duration url createdAt'
    })
    //console.log(getChatMember?.seen)
    await Chat.findOneAndUpdate({ _id: chatId }, {
      lastActive: new Date(),
      $addToSet: { seen: req.user?._id }
    }, { new: true })
    await GroupNotification.updateMany({ chat: chatId, receiver: req.user?._id }, {
      seen: true,
      lastSeen: new Date
    })
    const chatCheck = await Chat.findOne({ _id: chatId }).populate("members", "_id").populate("groupAdmin", "_id");
    const data = {
      data: getChatMember,
      memberCount: chatCheck?.members?.length,
      adminCount: chatCheck?.groupAdmin?.length,
      amIJoined: chatCheck?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      amIAdmin: chatCheck?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
    }
    res.status(200).json(data);
  }
  catch (error) {
    next(error)
  }
}
module.exports.makeAdminChatMembers = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    let { page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const skip = parseInt(page - 1);
    const size = limit;
    const numPage = skip * size;
    const { member } = req.body;
    const chatCheck = await Chat.findOne({ _id: chatId }).populate("members", "_id").populate("groupAdmin", "_id");
    let getChatMember = await Chat.findOneAndUpdate({ _id: chatId, members: req.user?._id, groupAdmin: req.user?._id }, {
      $push: { groupAdmin: member }
    }, { new: true }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    });
    getChatMember = await UploadFiles.populate(getChatMember, {
      path: 'content.files',
      select: '_id duration author filename sizeOfBytes type format duration url createdAt'
    })
    const addedUser = await User.findOne({ _id: member });
    //console.log(getChatMember?.seen)
    await Chat.findOneAndUpdate({ _id: chatId }, {
      lastActive: new Date(),
      $addToSet: { seen: req.user?._id }
    }, { new: true })
    await GroupNotification.updateMany({ chat: chatId, receiver: req.user?._id }, {
      seen: true,
      lastSeen: new Date
    })

    if (getChatMember) {
      if (chatCheck?.members?.length) {
        for (const member of chatCheck?.members) {
          await GroupNotification.create({
            receiver: member?._id,
            type: 'group',
            seen: false,
            subject: `${req?.user?.firstName}  ${req.user?.lastName} from ${getChatMember?.chatName} Group Added New Admin ${addedUser?.firstName || ' '} ${addedUser?.lastName || ' '} `,
            sender: req.user?._id,
            chat: getChatMember?._id,
          })
        }
      }
    }
    const data = {
      message: 'Group Member admin added',
      data: getChatMember,
      amIJoined: chatCheck?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      amIAdmin: chatCheck?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
    }
    res.status(200).json(data);
  }
  catch (error) {
    next(error)
  }
}
module.exports.removeAdminChatMembers = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { member } = req.body;
    let { page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const skip = parseInt(page - 1);
    const size = limit;
    const numPage = skip * size;
    const chatCheck = await Chat.findOne({ _id: chatId }).populate("members", "_id").populate("groupAdmin", "_id");
    let getChatMember = await Chat.findOneAndUpdate({ _id: chatId, members: req.user?._id, groupAdmin: req.user?._id }, {
      $pull: { groupAdmin: member }
    }, { new: true }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    });
    getChatMember = await UploadFiles.populate(getChatMember, {
      path: 'content.files',
      select: '_id duration author filename sizeOfBytes type format duration url createdAt'
    })
    //console.log(getChatMember?.seen)
    const addedUser = await User.findOne({ _id: member });
    await Chat.findOneAndUpdate({ _id: chatId }, {
      lastActive: new Date(),
      $addToSet: { seen: req.user?._id }
    }, { new: true })
    await GroupNotification.updateMany({ chat: chatId, receiver: req.user?._id }, {
      seen: true,
      lastSeen: new Date
    })
    if (getChatMember) {
      if (chatCheck?.members?.length) {
        for (const member of chatCheck?.members) {
          await GroupNotification.create({
            receiver: member?._id,
            type: 'group',
            seen: false,
            subject: `${req?.user?.firstName}  ${req.user?.lastName} from ${getChatMember?.chatName} Group Remove Admin ${addedUser?.firstName || ' '} ${addedUser?.lastName || ' '} `,
            sender: req.user?._id,
            chat: getChatMember?._id,
          })
        }
      }

    }
    const data = {
      message: 'Group Member admin Remove Successfully!',
      data: getChatMember,
      amIJoined: chatCheck?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      amIAdmin: chatCheck?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
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
      const count = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).count()
      let result = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).limit(limit * 1)
        .skip((page - 1) * limit).select("-members").select("-groupAdmin").sort("-updatedAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: 'latestMessage',
          populate: [
            {
              path: 'sender',
              select: '_id pic firstName lastName email online lastOnline createdAt',
            },
          ],
        })
      result = await UploadFiles.populate(result, {
        path: 'content.files',
        select: '_id duration author filename sizeOfBytes type format duration url createdAt'
      })
      // console.log(result)
      return res.status(200).json({ count, data: result })
    }
    if (status == 'latest') {
      const count = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).count()
      let result = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).select("-members").select("-groupAdmin").limit(limit * 1)
        .skip((page - 1) * limit).sort("-createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: 'latestMessage',
          populate: [
            {
              path: 'sender',
              select: '_id pic firstName lastName email online lastOnline createdAt',
            },
          ],
        })
      result = await UploadFiles.populate(result, {
        path: 'content.files',
        select: '_id duration author filename sizeOfBytes type format duration url createdAt'
      })
      return res.status(200).json({ count, data: result })
    }
    if (status == 'popular' || 'acc') {
      const count = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).count()
      let result = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).select("-members").select("-groupAdmin").limit(limit * 1)
        .skip((page - 1) * limit).sort("-members").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: 'latestMessage',
          populate: [
            {
              path: 'sender',
              select: '_id pic firstName lastName email online lastOnline createdAt',
            },
          ],
        })
      result = await UploadFiles.populate(result, {
        path: 'content.files',
        select: '_id duration author filename sizeOfBytes type format duration url createdAt'
      })
      return res.status(200).json({ data: result })
    }
    if (status == 'oldChat' || 'dec') {
      let result = await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).select("-members").select("-groupAdmin").limit(limit * 1)
        .skip((page - 1) * limit).sort("createdAt").populate("seen", "_id pic firstName lastName email online lastOnline createdAt").populate({
          path: 'latestMessage',
          populate: [
            {
              path: 'sender',
              select: '_id pic firstName lastName email online lastOnline createdAt',
            },
          ],
        })
      result = await UploadFiles.populate(result, {
        path: 'content.files',
        select: '_id duration author filename sizeOfBytes type format duration url createdAt'
      })
      return res.status(200).json({ count, data: result })
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
    const fullGroupChat = await Chat.find({ members: req.user?._id }).select("-members").select("-groupAdmin")
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
  let { page = 1, limit = 10 } = req.query;
  limit = parseInt(limit);
  const skip = parseInt(page - 1);
  const size = limit;

  const { chatId, chatName, topic, status, description, img } = req.body;
  try {
    const pervious = await Chat.findOne({ _id: chatId }).populate("members", "_id").populate("groupAdmin", "_id")
    let updatedChat = await Chat.findOneAndUpdate({ _id: chatId, groupAdmin: req?.user?._id }, {
      chatName, topic, status, description, img
    }, { new: true }).populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    });
    updatedChat = await UploadFiles.populate(updatedChat, {
      path: 'content.files',
      select: '_id duration author filename sizeOfBytes type format duration url createdAt'
    })
    if (!updatedChat) {
      return res.status(400).json({ error: { token: "you can perform only Admin Group Rename!" } });
    } if (updatedChat?.members?.length) {
      for (let i = 0; i < pervious?.members?.length; i++) {
        await GroupNotification.create({
          receiver: pervious?.members[i],
          type: 'group',
          chat: updatedChat?._id,
          subject: `Pervious Group Name ${pervious?.chatName}  and new updated name ${updatedChat?.chatName}`,
          text: `Group updated by ${req?.user?.firstName} ${req?.user?.lastName}`,
        })
      }
      const updateRes = await Chat.find({ _id: updatedChat?._id }).limit(1).select("-members").select("-groupAdmin")
      return res.status(200).json({ message: "chat successfully updated!", data: updateRes[0] || {} })
    }
  } catch (error) {
    next(error);
  }
};
module.exports.groupAddTo = async (req, res, next) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
  }
  let { page = 1, limit = 10 } = req.query;
  limit = parseInt(limit);
  const skip = parseInt(page - 1);
  const size = limit;
  const { chatId, userId } = req.body;
  try {
    const exist = await Chat.findOne({ _id: chatId, members: userId });
    if (exist) {
      return res.status(400).json({ error: { members: "Already Members This Group" } })
    }
    const added = await Chat.findOneAndUpdate({ _id: chatId }, {
      $addToSet: { members: userId },
    }, { new: true }).populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    });
    const addedRes = await Chat.find({ _id: added?._id }).limit(1).select("-members").select("-groupAdmin")
    // console.log(added)
    if (!added) {
      return res.status(404).json({ error: { "notfound": "chat not exists!" } });
    }
    const chatCheck = await Chat.findOne({ _id: chatId }).populate("members", "_id").populate("groupAdmin", "_id")
    const addedUser = await User.findOne({ _id: userId });
    let getChatMember = await Chat.findOne({ _id: added?._id }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    });
    getChatMember = await UploadFiles.populate(getChatMember, {
      path: 'content.files',
      select: '_id duration author filename sizeOfBytes type format duration url createdAt'
    })
    const data = {
      data: addedRes,
      amIJoined: chatCheck?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      amIAdmin: chatCheck?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
    }

    if (userId) {
      if (chatCheck?.members?.length) {
        for (const member of chatCheck?.members) {
          await GroupNotification.create({
            receiver: member?._id,
            type: 'group',
            chat: added?._id,
            subject: ` ${req?.user?.firstName}  ${req.user?.lastName} from ${getChatMember?.chatName} Group  Added New Member ${addedUser?.firstName || ' '} ${addedUser?.lastName || ' '} `,
            text: ` ${added?.chatName} Member added ${addedUser?.firstName || ' '} ${addedUser?.lastName || ' '}`,
          })
          await JoinGroup.create({
            joinChatId: chatId,
            userJoin: member
          })
        }
      }
    } else {
      await JoinGroup.create({
        joinChatId: chatId,
        userJoin: userId
      })
    }
    const memberJoinedInfo = {
      joinMemberCount: chatCheck?.members?.length,
      showMemberFront: getChatMember?.members
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
  let { page = 1, limit = 10 } = req.query;
  limit = parseInt(limit);
  const skip = parseInt(page - 1);
  const size = limit;
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
          subject: `${exist?.chatName} group Invitation request declined ${newMember?.firstName + ' ' + newMember?.lastName} `,
          text: `Invitation request declined ${newMember?.firstName} ${newMember?.lastName} `,
        })
        return res.status(200).json({ message: " group Invitation request declined!" })
      }
    }
    const added = await Chat.findByIdAndUpdate(chatId, {
      $addToSet: { members: userId },
    }, { new: true }).populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    });
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
          subject: `${added?.chatName} group Invitation request accepted ${newMember?.firstName + ' ' + newMember?.lastName} `,
          text: `you have added to new member ${newMember?.firstName} ${newMember?.lastName} `,
        })
        await JoinGroup.create({
          joinChatId: chatId,
          userJoin: userId
        })
      }
      const chatCheck = await Chat.findOne({ _id: chatId }).populate("members", "_id").populate("groupAdmin", "_id")
      const memberJoinedInfo = {
        joinMemberCount: chatCheck?.members?.length,
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
    let { page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const skip = parseInt(page - 1);
    const size = limit;
    const { chatId, email, expire } = req.body;
    const chatGroup = await Chat.findOne({ _id: chatId }).populate({
      path: 'members',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {
        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'groupAdmin',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {
        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    }).populate({
      path: 'seen',
      select: '_id pic firstName lastName email online lastOnline createdAt',
      model: 'User',
      options: {

        skip: skip,
        limit: size
      },
      match: {
        // filter result in case of multiple result in populate
        // may not useful in this case
      }
    });
    if (!chatGroup) {
      return res.status(400).json({ error: { invite: "Gen Invite Link expired! please provide valid Chat Group" } });
    }
    const shortId = shortid.generate()
    const data = {
      chat: chatGroup?._id,
      author: req.user._id,
      token: genInviteGroup(shortId, expire),
      shortCode: shortId,
    }
    await Invitation.create(data)
    const link = `https://collaball.netlify.app/group/invite/${shortId}`;
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
    let { page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const skip = parseInt(page - 1);
    const size = limit;
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
        let data = await Chat.find({ members: req.user?._id }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate({
          path: 'members',
          select: '_id pic firstName lastName email online lastOnline createdAt',
          model: 'User',
          options: {

            skip: skip,
            limit: size
          },
          match: {
            // filter result in case of multiple result in populate
            // may not useful in this case
          }
        }).populate({
          path: 'groupAdmin',
          select: '_id pic firstName lastName email online lastOnline createdAt',
          model: 'User',
          options: {

            skip: skip,
            limit: size
          },
          match: {
            // filter result in case of multiple result in populate
            // may not useful in this case
          }
        }).populate({
          path: 'seen',
          select: '_id pic firstName lastName email online lastOnline createdAt',
          model: 'User',
          options: {
            skip: skip,
            limit: size
          },
          match: {
            // filter result in case of multiple result in populate
            // may not useful in this case
          }
        });
        data = await UploadFiles.populate(data, {
          path: 'content.files',
          select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
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
  let { page = 1, limit = 10 } = req.query;
  limit = parseInt(limit);
  const skip = parseInt(page - 1);
  const size = limit;
  const { chatId, userId, meLeave } = req.body;
  // console.log(chatId, userId)
  try {
    let remove = meLeave ? await Chat.findOneAndUpdate({
      _id: chatId, members: req.user?._id
    }, {
      $pull: { members: userId },
    }, { new: true }) : await Chat.findOneAndUpdate({
      _id: chatId, members: req.user?._id, groupAdmin: req.user?._id
    }, {
      $pull: { members: userId },
    }, { new: true });
    if (!remove) {
      return res.status(400).json({ error: { "isAdmin": "Permission Denied You can perform only admin" } });
    }
    if (remove) {
      const chatCheck = await Chat.findOne({ _id: chatId }).populate("members", "_id").populate("groupAdmin", "_id")
      let getChatMember = await Chat.findOne({ _id: chatId }).select("members groupAdmin _id seen img chatName latestMessage topic status description").populate({
        path: 'members',
        select: '_id pic firstName lastName email online lastOnline createdAt',
        model: 'User',
        options: {

          skip: skip,
          limit: size
        },
        match: {
          // filter result in case of multiple result in populate
          // may not useful in this case
        }
      }).populate({
        path: 'groupAdmin',
        select: '_id pic firstName lastName email online lastOnline createdAt',
        model: 'User',
        options: {

          skip: skip,
          limit: size
        },
        match: {
          // filter result in case of multiple result in populate
          // may not useful in this case
        }
      }).populate({
        path: 'seen',
        select: '_id pic firstName lastName email online lastOnline createdAt',
        model: 'User',
        options: {

          skip: skip,
          limit: size
        },
        match: {
          // filter result in case of multiple result in populate
          // may not useful in this case
        }
      });
      if (chatCheck?.members?.length) {
        const addedUser = await User.findOne({ _id: userId });
        for (const member of chatCheck?.members) {
          await GroupNotification.create({
            receiver: member?._id,
            type: 'group',
            seen: false,
            subject: `${req?.user?.firstName}  ${req.user?.lastName} from ${getChatMember?.chatName} Group Leave Member ${addedUser?.firstName || ' '} ${addedUser?.lastName || ' '} `,
            sender: req.user?._id,
            chat: chatId,
          })
        }
      }
      await GroupNotification.deleteMany({ chat: chatId, receiver: userId })
      const data = {
        data: getChatMember,
        amIJoined: chatCheck?.members?.some(am => am?._id?.toString() === req.user?._id?.toString()),
        amIAdmin: chatCheck?.groupAdmin?.some(am => am?._id?.toString() === req.user?._id?.toString()),
      }
      await JoinGroup.deleteMany({
        joinChatId: chatId,
        userJoin: userId
      });
      return res.status(200).json({ message: "Group Member Leave Successfully!", data })
    }
  }
  catch (error) {
    next(error)
  }
}


//media files all 
module.exports.inviteCheck = async (req, res, next) => {
  const { shortCode } = req.body;
  try {
    if(!req?.user?._id){
return res.status(400).json({error:{invite:'Please Login Before Access this page!'}})
    }
    const valided = await Invitation.findOne({ shortCode: shortCode }).populate("chat","_id chatName img members");
      if(!valided){
        return res.status(400).json({error:{invite:'Invitaion code is invalid!'}})
      }
      return res.status(200).json({data:{
        chat:{
          _id:valided?._id,
          chatName:valided.chatName,
          img:valided.img,
          membersCount:valided.members?.length
        }
      }})

  }
  catch (error) {
    next(error)
  }
}
module.exports.mediaFilesSearch = async (req, res, next) => {
  try {
    const { chat, status, page = 1, limit = 10 } = req.query;
    const keyword = req.query.search ? {
      chat: chat,
      type: status,
      $or: [
        { "filename": { $regex: req.query.search || '', $options: "i" } },
      ],
    } : {
      chat: chat,
      type: status,
    };
    const find = await UploadFiles.find(keyword).limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await UploadFiles.find(keyword).count();
    return res.status(200).json({ data: find, count })
  }
  catch (error) {
    next(error)
  }
}

