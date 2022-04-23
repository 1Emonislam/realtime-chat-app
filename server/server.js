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
const socketServer = require('./socket/socketServer');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/proflieRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');
const noteRoutes = require('./routes/noteRoutes')
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
global.moment = moment;
//Database Connected
connectedDb();
socketServer();
//Use Routes
app.use('/api/auth', userRoutes);
app.use('/api/chat', chatRoutes)
app.use('/api/friend', friendRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/note',noteRoutes );
app.get('/', (req, res) => {
    res.send('server connected')
})
serverApp.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)