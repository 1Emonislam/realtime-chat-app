require('dotenv').config();
const express = require('express')
const cors = require('cors');
const connectedDb = require('./config/db');
const { errorLog, errorHandlerNotify } = require('express-error-handle')
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares 
app.use(cors());
app.use(express.json());
//Database Connected
connectedDb();
app.get('/', (req, res) => {
    res.send('server connected')
})
const server = app.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)