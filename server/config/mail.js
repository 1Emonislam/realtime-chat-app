if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env.development" });
}
const env = process.env;
module.exports = {
    gmail_host: env.GMAIL_HOST,
    gmail_password: env.GMAIL_PASSWORD,
    gmail_client_id: env.GMAIL_CLIENT_ID,
    gmail_client_secret: env.GMAIL_CLIENT_SECRET,
    gmail_redirect_uri: env.GMAIL_REDIRECT_URI,
    gmail_refresh_token: env.GMAIL_REFRESH_TOKEN,
    admin_sender_email: env.ADMIN_SENDER_EMAIL,
};