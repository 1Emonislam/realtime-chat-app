require('dotenv').config();
const express = require('express')
const cors = require('cors');
const connectedDb = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares 
app.use(cors());
app.use(express.json());
//Database Connected
connectedDb();
const server = app.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})