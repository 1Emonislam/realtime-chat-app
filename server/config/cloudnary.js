const cloudinary = require("cloudinary").v2;

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const configure = () => {
    try {
        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });

        console.log("Configured succesfull.");
    } catch (error) {
        console.log("Configured failed!");
        console.error(error);
        next(error)
        process.exit(1);
    }
};

module.exports = configure;