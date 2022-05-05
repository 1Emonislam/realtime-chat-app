export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};
export const isSameSenderPermission = (messages, m, i, userId) => {
    // console.log(userId,messages[i]?.chat?.groupAdmin)
    if (
        messages[i].sender._id === userId || messages[i]?.chat?.groupAdmin?.some(user => user?._id === userId)
    ) return true;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    ) return false;
};

export const isSameSender = (messages, m, i, userId) => {
    // console.log(messages)
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
    // console.log(loggedUser, users)
    return users[0]._id === loggedUser._id ? users[1].firstName + ' ' + users[1].lastName : users[0].firstName + ' ' + users[0].lastName;
};

export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};
export const getSeenUser = (seenUsers, loggedUser) => {
    const filter = seenUsers.filter(user => user?._id !== loggedUser?._id);
    return filter;
}
export const chatExists = (chatId, existId) => {
    return chatId === existId;
}
export const currentMsgNotification = (chatId, msgNotification) => {
    return msgNotification.filter(notify => notify?.chat?._id === chatId);
}

export const notificatinMessageCountRecentChat = (chatId, msgNotification) => {
    // console.log(msgNotification?.filter(push => push?.chat?._id === chatId?._id && push?.seen === false)?.length)
    return {
        count: msgNotification?.filter(push => push?.chat?._id === chatId?._id && push?.seen === false)?.length,
        msg: { ...msgNotification?.filter(push => push?.chat?._id === chatId?._id && push?.seen === false).slice(0, -1) }
    }
}
export const amIAdmin = (groupAdmin, amI) => {
    console.log(groupAdmin)
    return groupAdmin?.includes(amI);
}