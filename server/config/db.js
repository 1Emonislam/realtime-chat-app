const mongoose = require('mongoose');
const connectedDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectedDb;