require("dotenv").config();

const { db } = require("../models");
const jwt = require("../module/jwt");

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

  await user
    .findOne({ userEmail: userEmail, userPassword: userPassword })
    .then(async (r) => {
      const token = await jwt.sign(r.userEmail);
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: {
          userIdx: r.userEmail,
          token: token.token,
        },
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: e,
      };
    });
};

exports.getUserInfo = async (ctx) => {
  const { userIdx } = ctx.request.body;

  if (userIdx) {
    let { userEmail, userName, userIntro, profileImg, userPassword } =
      await user.findOne({
        userEmail: userIdx,
      });

    if (profileImg) {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: {
          userEmail: userEmail,
          userName: userName,
          userPassword: userPassword,
          userIntro: userIntro,
          profileImg: profileImg,
        },
      };
    } else {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: {
          userEmail: userEmail,
          userName: userName,
          userPassword: userPassword,
          userIntro: userIntro,
        },
      };
    }
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
    };
  }
};

exports.updateProfile = async (ctx) => {
  console.log(ctx.request.body);
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
    .then((r) => {
      ctx.body = { status: 200, resultCode: 1 };
    })
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, err: e };
    });
};

exports.uploadProfilePicture = async (ctx) => {
  const { userIdx } = ctx.request.body;
  const file = ctx.request.file;

  if (file) {
    await user.updateOne(
      { userEmail: userIdx },
      { $set: { profileImg: file.path } }
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
      err: "데이터 조회 실패",
    };
  }
};
