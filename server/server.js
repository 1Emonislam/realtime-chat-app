require('dotenv').config();
const express = require('express')
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const connectedDb = require('./config/db');
const { errorLog, errorHandlerNotify } = require('express-error-handle');
const socketServer = require('./socket/socketServer');
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares 
app.use(cors());
app.use(express.json());
const serverApp = http.createServer(app);
const io = new Server(serverApp, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    },
});
global.io = io;
//Database Connected
connectedDb();
socketServer();
app.get('/', (req, res) => {
    res.send('server connected')
})
serverApp.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)