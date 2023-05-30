const { db } = require("../models");
const jwt = require("../module/jwt");
const commonUtil = require("../util/commonUtil");
// const fs = require("fs");

const user = db.collection("user");

exports.register = async (ctx) => {
  const { userEmail, userName, userPassword } = ctx.request.body;

  if (await user.findOne({ userEmail: userEmail }))
    ctx.body = { status: 200, resultCode: 0 };
  else {
    await user.insertOne({
      userEmail: userEmail,
      userName: userName,
      userPassword: userPassword,
      userIntro: "",
    });
    ctx.body = { status: 200, resultCode: 1 };
  }
};

exports.login = async (ctx) => {
  const { userEmail, userPassword } = ctx.request.body;

  if (
    await user.findOne({ userEmail: userEmail, userPassword: userPassword })
  ) {
    const token = await jwt.sign(userEmail);
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: {
        userIdx: userEmail,
        token: token.token,
      },
    };
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
    };
  }
};

exports.getUserInfo = async (ctx) => {
  const { userIdx } = ctx.request.body;

  if (commonUtil.isCheckNull(userIdx)) {
    const { userEmail, userName, userIntro } = await user.findOne({
      userEmail: userIdx,
    });
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: {
        userEmail: userEmail,
        userName: userName,
        userIntro: userIntro,
      },
    };
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
    };
  }
};
