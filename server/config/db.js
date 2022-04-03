const mongoose = require('mongoose');
const connectedDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log(error.message);
    }
}

// const mongoose = require("mongoose");
// const connectedDb = async (req, res) => {
//     try {
//         const uri = process.env.MONGO_URL;
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`MongoDB Successfully Connected`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit();
//     }
// };

// api
// https://chat-app-demos.herokuapp.com/
module.exports = connectedDb;