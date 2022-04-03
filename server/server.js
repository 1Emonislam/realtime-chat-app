require('dotenv').config();
const express = require('express')
const cors = require('cors');
const connectedDb = require('./config/db');
const { errorLog, errorHandlerNotify } = require('express-error-handle')
const app = express();
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
//middlewares 
app.use(cors());
app.use(express.json());
app.use(cookieParser())
//Database Connected
connectedDb();
app.get('/', (req, res) => {
    res.send('server connected')
})
//routes
app.use('/users', userRoutes)
const server = app.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})

//handel error
app.use(errorLog)
app.use(errorHandlerNotify)