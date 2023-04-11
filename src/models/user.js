const { db } = require("../models");

const user = db.collection("user");

exports.register = async (ctx) => {
  const { email, pw } = ctx.request.body;

  if (await user.findOne({ email: email }))
    ctx.body = { status: false, msg: "회원가입 실패" };
  else {
    await user.insertOne({ email: email, pw: pw });
    ctx.body = { status: true, msg: "회원가입 성공" };
  }
};

exports.login = async (ctx) => {
  const { email, pw } = ctx.request.body;

  if (!(await user.findOne({ email: email, pw: pw })))
    ctx.body = { status: false, msg: "로그인 실패" };
  else ctx.body = { status: true, msg: "로그인 성공" };
};
