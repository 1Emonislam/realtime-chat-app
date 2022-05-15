const { mongoose, Schema } = require('mongoose');
const uploadFilesSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    url: {
        type: String,
    },
    duration: {
        type: String,
    },
    filename: {
        type: String,
    },
    sizeOfBytes: {
        type: String,
    },
    format: {
        type: String,
    }
}, {
    timestamps: true,
});
const UploadFiles = mongoose.model("UploadFiles", uploadFilesSchema);
module.exports = UploadFiles;