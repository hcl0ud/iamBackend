const randToken = require("rand-token");
const Jwt = require("jsonwebtoken");
const key = require("../config/secretKey");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: async (userEmail) => {
    /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
    const payload = {
      // idx: user.userIdx,
      email: userEmail,
    };
    return {
      // sign 메소드를 통해 access token 발급!
      token: Jwt.sign(payload, key.secretKey, key.option),
      refreshToken: randToken.uid(256),
    };
  },
  verify: async (token) => {
    let decoded;

    try {
      // verify를 통해 값 decode!
      decoded = Jwt.verify(token, key.secretKey);
    } catch (err) {
      if (err.message === "Jwt expired") {
        console.log("expired token");
        return TOKEN_EXPIRED;
      } else if (err.message === "invalid token") {
        console.log("invalid token");
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
};
