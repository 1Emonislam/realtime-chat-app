require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const http = require('http');
const cors = require('cors');
var moment = require('moment')
var bodyParser = require('body-parser')
const { Server } = require("socket.io");
const connectedDb = require('./config/db');
const { errorLog, errorHandlerNotify } = require('express-error-handle');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/proflieRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');
const noteRoutes = require('./routes/noteRoutes')
const notificationRoutes = require('./routes/notificationRoutes');
const Notification = require('./models/groupNotificationModel');
const User = require('./models/userModel');
const Chat = require('./models/chatModel');
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "2gb", extended: true, parameterLimit: 50000 }));
app.use(cors())
app.use(cookieParser());
const serverApp = http.createServer(app);
serverApp.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})
const io = new Server(serverApp, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
global.io = io;
//Database Connected
connectedDb();
//Use Routes

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

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
let users = {};
const chatOnlineUser = {};
io.on("connection", async (socket) => {
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
    socket.on('new message', async (newMessageRecieved) => {
        // console.log(newMessageRecieved)
        let chat = await Chat.findOne({ _id: newMessageRecieved?.chat?._id }).populate("members", "_id").select("-groupAdmin").select("-seen");
        if (!chat.members) return console.log('chat.members not defined');
        const members = chat?.members?.filter(user => user?._id !== newMessageRecieved?.sender?._id);
        const notificationObj = {
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
        socket.in(newMessageRecieved?.chat?._id).emit("message recieved", { newMessageRecieved, notificationObj })
        // console.log(notificationObj)
        // members.forEach(user => {
        //     if (user?._id?.toString() === newMessageRecieved.sender?._id?.toString()) return;
        //     socket.in(user?._id).emit("message recieved", { newMessageRecieved, notificationObj })
        // })
    })
    const userSessionData = socket.handshake?.auth?.data?.user;
    let loggedUser;
    loggedUser = await User.findOneAndUpdate({ _id: userSessionData?._id }, {
        online: true,
        socketId: socket.id,
    }, { new: true })
    users[socket.id] = loggedUser?._id;
    socket.emit('my info', loggedUser)
    socket.on('disconnect', async () => {
        delete users[socket.id];
        loggedUser = await User.findOneAndUpdate({ _id: userSessionData?._id }, {
            online: false,
            socketId: null,
        }, { new: true })
        socket.off("setup", (userData) => {
            console.log('User Disconnected');
            socket.leave(userData?._id)
        })
    })
    socket.emit("online user", users)
    socket.on("online members", async (chat) => {
        const onlineMember = await Chat.findOne({ _id: chat }).populate("members", "_id pic firstName lastName online").select("-seen").select("-groupAdmin")
        socket.emit("online member",onlineMember)
    })

})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)