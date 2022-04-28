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
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: false, limit: '50mb', parameterLimit: 100000,
    extended: true
}))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser());
// Middleware
const serverApp = http.createServer(app);
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
serverApp.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})
io.on("connection", (socket) => {
    console.log('a user connected');
    socket.on('setup', async (userData) => {
        socket.join(userData?._id);
        // console.log(userData)
        await User.findOneAndUpdate({ _id: userData?._id }, {
            online: true,
            socketId: socket.id,
        }, { new: true })
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
        const notificationObj = {
            receiver: chat?.members,
            type: 'groupchat',
            subject: `New Message from ${newMessageRecieved?.sender?.firstName + ' ' + newMessageRecieved?.sender?.lastName}`,
            message: {
                _id: newMessageRecieved?._id,
                content: newMessageRecieved?.content,
            },
            seen: false,
            chat: newMessageRecieved?.chat,
            _id: newMessageRecieved?._id,
            createdAt: newMessageRecieved.createdAt,
            updatedAt: newMessageRecieved.updatedAt
        }
        // console.log(notificationObj)
        const members = chat?.members?.filter(user => user?._id !== newMessageRecieved?.sender?._id);
        members.forEach(async (user) => {
            if (user?._id == newMessageRecieved.sender?._id) return;
            await Notification.create({
                receiver: user?._id,
                type: 'groupchat',
                subject: `New Message from ${newMessageRecieved?.sender?.firstName + ' ' + newMessageRecieved?.sender?.lastName}`,
                message: newMessageRecieved?._id,
                chat: newMessageRecieved?.chat?._id,
            })
            socket.in(user._id).emit("message recieved", notificationObj)
        })
    })
    socket.on("online members", (onlineMember) => {
        socket.in(onlineMember?._id).emit("online member", onlineMember)
    })

    socket.off("setup", (userData) => {
        console.log('User Disconnected');
        socket.leave(userData?._id)
    })
})







//handel error
app.use(errorLog)
app.use(errorHandlerNotify)