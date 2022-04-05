if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env.development" });
}
const env = process.env;
module.exports = {
	saltOrRounds: 11,
	adminEmailAddress: "support@test.com",
	JWT_SECRET: env.JWT_SECRET
}