require('dotenv').config();
const express = require('express')
const http = require('http');
const cors = require('cors');
var morgan = require('morgan');
var moment = require('moment')
var bodyParser = require('body-parser')
const { Server } = require("socket.io");
const connectedDb = require('./config/db');
const { errorLog, errorHandlerNotify } = require('express-error-handle');
const socketServer = require('./socket/socketServer');
const userRoutes = require('./routes/userRoutes')
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(cors({
    origin: '*',
    credentials: true
}));
//Use Routes
app.use('/api/auth', userRoutes)
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("tiny"))
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

app.get('/', (req, res) => {
    res.send('server connected')
})
serverApp.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)