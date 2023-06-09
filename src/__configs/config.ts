// import * as process from "process";

// console.log(process.env.NONE_ENV);
// console.log("PORT", process.env.PORT);
const configs = {

  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET || "AccessToken_SECRET_KeY",
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || "1 days",

  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "RefreshToken_SECRET_KeY",
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || "3 days",
  // REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || "1 m",

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
  // NO_REPLY_EMAIL_FROM: `"No Reply. Пожежне Спостереження" <${process.env.NO_REPLY_EMAIL}>`
  NO_REPLY_EMAIL_FROM: process.env.NO_REPLY_EMAIL_FROM,
};
