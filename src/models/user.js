const { db } = require("../models");

const user = db.collection("user");

exports.register = async (ctx) => {
  const { userEmail, userPassword } = ctx.request.body;

  if (await user.findOne({ email: userEmail }))
    ctx.body = { status: false, msg: "회원가입 실패" };
  else {
    await user.insertOne({ email: userEmail, pw: userPassword });
    ctx.body = { status: true, msg: "회원가입 성공" };
  }
};

exports.login = async (ctx) => {
  const { userEmail, userPassword } = ctx.request.body;
  console.log(ctx.request.body);

  if (!(await user.findOne({ email: userEmail, pw: userPassword })))
    ctx.body = { status: false, msg: "로그인 실패" };
  else ctx.body = { status: true, msg: "로그인 성공" };
};
