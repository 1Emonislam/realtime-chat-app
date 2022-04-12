const { Schema, model } = require("mongoose");
const NotificationSchema = new Schema(
    {
        receiver: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "User",
            }
        ],
        type: {
            type: String,
            enum: ["chat", "group", "status", 'call', 'inbox', 'contact', 'others'],
            default: 'chat'
        },
        subject: String,
        message: String,
        seen: {
            type: Boolean,
            required: true,
            default: false,
        },
        lastSeen: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);

const Notification = model("Notification", NotificationSchema);
module.exports = Notification;