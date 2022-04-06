if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env.development" });
}
const env = process.env;
module.exports = {
    gmail_client_id: env.GMAIL_CLIENT_ID,
    gmail_client_secret: env.GMAIL_CLIENT_SECRET,
    gmail_redirect_uri: env.GMAIL_REDIRECT_URI,
    gmail_refresh_token: env.GMAIL_REFRESH_TOKEN,
    admin_sender_email:env.ADMIN_SENDER_EMAIL,
    host: env.EMAIL_HOST,
    port: env.EMAIL_HOST_PORT,
    email: env.EMAIL_ADDRESS,
    password: env.EMAIL_PASSWORD,
};