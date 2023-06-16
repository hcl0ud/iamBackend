const { db } = require("../models");
const jwt = require("../module/jwt");

const multer = require("koa-multer");
// const fs = require("fs");

// 파일 업로드를 위한 Multer 설정
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

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
  const { userIdx, userIntro } = ctx.request.body;

  try {
    const result = await user.updateOne(
      { userEmail: userIdx },
      { $set: { userIntro } }
    );

    if (result.modifiedCount > 0) {
      ctx.body = {
        status: 200,
        resultCode: 1,
        message: "소개말을 적었습니다.",
      };
    } else {
      ctx.body = {
        status: 200,
        resultCode: 0,
        message: "업데이트 실패!",
      };
    }
  } catch (error) {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "서버 오류",
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