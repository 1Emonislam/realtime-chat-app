require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');
var moment = require('moment')
var bodyParser = require('body-parser')
const connectedDb = require('./config/db');
const { errorLog, errorHandlerNotify } = require('express-error-handle');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/proflieRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');
const noteRoutes = require('./routes/noteRoutes')
const videoCallRoomVerify = require('./routes/videoCallRoomVerify')
const notificationRoutes = require('./routes/notificationRoutes');
const User = require('./models/userModel');
const Chat = require('./models/chatModel');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;
//middlewares
app.use(cors())
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "2gb", extended: true, parameterLimit: 50000 }));

app.use(cookieParser());
http.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})
//Database Connected
connectedDb();
//Use Routes
app.use('/', videoCallRoomVerify)
app.use('/api', notificationRoutes)
app.use('/api/auth', userRoutes);
app.use('/api/chat', chatRoutes)
app.use('/api/note', noteRoutes);
app.use('/api/friend', friendRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message', messageRoutes);

app.get('/', (req, res) => {
    res.send('server connected')
})
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

// Route
app.get('/ping', (req, res) => {
    res
        .send({
            success: true,
        })
        .status(200);
});
let users = {};
let socketList = {};
io.on("connection", async (socket) => {
    const userSessionData = socket.handshake?.auth?.data?.user;
    let loggedUser;
    loggedUser = await User.findOneAndUpdate({ _id: userSessionData?._id }, {
        online: true,
        socketId: socket.id,
    }, { new: true })
    users[socket.id] = loggedUser?._id;
    socket.emit('my info', loggedUser)
    console.log("socket.io: User connected: ", socket.id);
    socket.on('setup', (userData) => {
        socket.join(userData?._id);
        socket.emit('conected');
    })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("user Joined Room:" + room)
    })
    socket.on('typing', (room) => {
        // console.log(room)
        socket.in(room?.chat).emit("typing", room);
    })
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))
    socket.on('new message', (newMessageRecieved) => {
        // console.log(newMessageRecieved)
        let chat = newMessageRecieved.chat;
        if (!chat.members) return console.log('chat.members not defined');
        const members = chat?.members?.filter(user => user?._id !== newMessageRecieved?.sender?._id);
        const notificationObj = {
            receiver: members,
            type: 'groupchat',
            subject: `New Message from ${newMessageRecieved?.sender?.firstName + ' ' + newMessageRecieved?.sender?.lastName}`,
            message: {
                _id: newMessageRecieved?._id,
                content: newMessageRecieved?.content,
            },
            seen: false,
            sender: newMessageRecieved?.sender,
            chat: newMessageRecieved?.chat,
            _id: newMessageRecieved?._id,
            createdAt: newMessageRecieved.createdAt,
            updatedAt: newMessageRecieved.updatedAt
        }
        // console.log(notificationObj)
        members.forEach(user => {
            if (user?._id?.toString() === newMessageRecieved.sender?._id?.toString()) return;
            socket.in(user?._id).emit("message recieved", { newMessageRecieved, notificationObj })
        })
    })
    socket.on("online members", (onlineMember) => {
        socket.in(onlineMember?._id).emit("online member", onlineMember)
    })
    socket.on('group calling', ({ chat, callType }) => {
        if (!chat?.members?.length) return
        chat?.members.forEach(user => {
            if (user?._id?.toString() === loggedUser?._id?.toString()) return;
            socket.in(user?._id).emit("group calling recieved", { chatName: chat.chatName, callType, img: chat.img, chat: chat?._id })
        })
    })
    //webrtc group caling....
    socket.on('BE-check-user', ({ roomId, userName }) => {
        let error = false;
        // console.log(roomId)
        io.sockets.in(roomId).clients((err, clients) => {
            clients.forEach((client) => {
                if (socketList[client] == userName) {
                    error = true;
                }
            });
            socket.emit('FE-error-user-exist', { error });
        });
    });
    /**
     * Join Room
     */
    socket.on('BE-join-room', ({ roomId, userName, name, pic }) => {
        // Socket Join RoomName
        console.log(name, pic)

        console.log(`${roomId} group calling...joined user ${userName}`)
        socket.join(roomId);
        socketList[socket.id] = { userName, name, pic, video: true, audio: true };
        //Set User List
        io.sockets.in(roomId).clients((err, clients) => {
            try {
                const users = [];
                clients.forEach((client) => {
                    client.name = name;
                    client.pic = pic;
                    // Add User List
                    users.push({ userId: client, info: socketList[client], name, pic });
                });
                socket.broadcast.to(roomId).emit('FE-user-join', users);
                // io.sockets.in(roomId).emit('FE-user-join', users);
            } catch (e) {
                io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
            }
        });
    });

    socket.on('BE-call-user', ({ userToCall, from, signal }) => {
        io.to(userToCall).emit('FE-receive-call', {
            signal,
            from,
            info: socketList[socket.id],
        });
    });
    socket.on('BE-accept-call', ({ signal, to }) => {
        io.to(to).emit('FE-call-accepted', {
            signal,
            answerId: socket.id,
        });
    });

    socket.on('BE-send-message', ({ roomId, msg, sender }) => {
        io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
    });

    socket.on('BE-leave-room', ({ roomId, leaver }) => {
        delete socketList[socket.id];
        socket.broadcast
            .to(roomId)
            .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
        io.sockets.sockets[socket.id].leave(roomId);
    });
    socket.on('BE-leave-room-end', ({ roomId, leaver }) => {
        io.sockets.in(roomId).emit('callEndedRoom', { callEnd: true });
    });

    socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
        if (switchTarget === 'video') {
            socketList[socket.id].video = !socketList[socket.id]?.video;
        } else {
            socketList[socket.id].audio = !socketList[socket.id]?.audio;
        }
        socket.broadcast
            .to(roomId)
            .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
    });

    socket.on('disconnect', async () => {
        socket.disconnect();
        socket.off("setup", (userData) => {
            console.log('User Disconnected');
            socket.leave(userData?._id)
        })
        delete users[socket.id];
        loggedUser = await User.findOneAndUpdate({ _id: userSessionData?._id }, {
            online: false,
            socketId: null,
        }, { new: true })
    })
    socket.emit("online user", users)
})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)