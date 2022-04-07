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
// Middleware
const middleware = [
    morgan("tiny"),
    express.static("public"),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
];
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
  }
const domainsFromEnv = process.env.CORS_DOMAINS || ""
const whitelist = domainsFromEnv.split(",").map(item => item.trim())
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(middleware);
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
app.use('/api/auth', userRoutes)
app.get('/', (req, res) => {
    res.send('server connected')
})
serverApp.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)