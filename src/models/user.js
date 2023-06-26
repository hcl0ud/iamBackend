require("dotenv").config();

const { db } = require("../models");
const jwt = require("../module/jwt");

const user = db.collection("user");
const board = db.collection("board");

exports.register = async (ctx) => {
  const { userEmail, userName, userPassword } = ctx.request.body;

  await user
    .findOne({ userEmail: userEmail })
    .then((r) => {
      user.insertOne({
        userEmail: userEmail,
        userName: userName,
        userPassword: userPassword,
        userIntro: "",
      });
      ctx.body = { status: 200, resultCode: 1 };
    })
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, err: e };
    });
};

exports.login = async (ctx) => {
  const { userEmail, userPassword } = ctx.request.body;

  await user
    .findOne({ userEmail: userEmail, userPassword: userPassword })
    .then(async (r) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: {
          userIdx: r.userEmail,
          token: await jwt.sign(r.userEmail).token,
        },
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        err: e,
      };
    });
};

exports.getUserInfo = async (ctx) => {
  const { userIdx } = ctx.request.body;

  await user
    .findOne({
      userEmail: userIdx,
    })
    .then((r) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: r,
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        err: e,
      };
    });
};

exports.updateProfile = async (ctx) => {
  const { userEmail, userName, userIntro, userPassword, profileImg } =
    ctx.request.body;

  await user
    .updateOne(
      { userEmail: userEmail },
      {
        $set: {
          userEmail: userEmail,
          userName: userName,
          userIntro: userIntro,
          userPassword: userPassword,
          profileImg: profileImg,
        },
      }
    )
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, err: e };
    });
};

exports.uploadProfilePicture = async (ctx) => {
  const { userIdx } = ctx.request.body;

  if (ctx.request.file) {
    await user.updateOne(
      { userEmail: userIdx },
      { $set: { profileImg: ctx.request.file.path } }
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

  await board
    .find({ userEmail: userIdx }, {})
    .toArray()
    .then((r) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: r.reverse(),
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: "데이터 조회 실패",
        err: e,
      };
    });
};
