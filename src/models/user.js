const { db } = require("../models");
const jwt = require("../module/jwt");
const multer = require("koa-multer");
// const fs = require("fs");

const upload = multer({ dest: "uploads/" });
const user = db.collection("user");
const board = db.collection("board");

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

  if (userIdx) {
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

exports.updateProfile = async (ctx) => {
  let { userIdx, userEmail, userName, userPassword, userIntro } =
    ctx.request.body;

  if (
    await user.updateOne(
      { userEmail: userIdx },
      {
        $set: {
          userEmail: userEmail,
          userName: userName,
          userPassword: userPassword,
          userIntro: userIntro,
        },
      }
    )
  ) {
    ctx.body = {
      status: 200,
      resultCode: 1,
      msg: "업데이트 성공!",
    };
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      msg: "업데이트 실패!",
    };
  }
};

exports.uploadProfilePicture = async (ctx) => {
  const { userIdx } = ctx.request.body;
  const { profilePicture } = ctx.request.body.files;

  if (profilePicture) {
    const picturePath = profilePicture.path;
    await user.updateOne(
      { userIdx: userIdx },
      { $set: { photoPath: picturePath } }
    );
    ctx.body = {
      status: 200,
      resultCode: 1,
      message: "프로필 사진이 업로드되었습니다.",
    };
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "파일 업로드에 실패했습니다.",
    };
  }
};

exports.getBoardList = async (ctx) => {
  const { userIdx } = ctx.request.body;
  const data = await board.find({ userEmail: userIdx }, {}).toArray();
  try {
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: data.reverse(),
    };
  } catch (error) {
    ctx.body = {
      status: 500,
      resultCode: 0,
      error: "데이터 조회 실패",
    };
  }
};
