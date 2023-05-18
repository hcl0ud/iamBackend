const { db } = require("../models");
const jwt = require("../module/jwt");
// const fs = require("fs");

const user = db.collection("user");

exports.register = async (ctx) => {
  const { userEmail, userPassword } = ctx.request.body;

  if (await user.findOne({ email: userEmail }))
    ctx.body = { status: 200, resultCode: 0 };
  else {
    await user.insertOne({ email: userEmail, pw: userPassword });
    ctx.body = { status: 200, resultCode: 1 };
  }
};

exports.login = async (ctx) => {
  const { userEmail, userPassword } = ctx.request.body;

  if (!(await user.findOne({ email: userEmail, pw: userPassword })))
    ctx.body = {
      status: 200,
      resultCode: 0,
    };
  else {
    const token = await jwt.sign(userEmail);
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: {
        token: token.token,
      },
    };
  }
};
