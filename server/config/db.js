const mongoose = require('mongoose');
const configure = require('./cloudnary');
const connectedDb = async () => {
    if (process.env?.MONGO_URL) {
        try {
            const uri = process.env.MONGO_URL;
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`MongoDB Successfully Connected`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit();
        }
    }
    if (process.env?.MONGO_URI) {
        try {
            // console.log(moment(new Date()).fromNow())
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Database Connected Successfully')
        } catch (error) {
            console.log(error.message);
        }
    }
}
module.exports = connectedDb;