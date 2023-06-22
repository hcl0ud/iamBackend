const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");
const board = db.collection("board");

// 크루생성
exports.createCrew = async (ctx) => {
  const { crewName, profileImg, crewIntro, userIdx } = ctx.request.body;
  const userInfo = await user.findOne({ userEmail: userIdx });

  // 동일한 크루명이 있는지 확인
  const SamecrewName = await crew.findOne({ crewName: crewName });
  if (SamecrewName) {
    ctx.body = { status: 200, resultCode: 0, error: "중복된 크루명입니다" };
  } else {
    await crew.insertOne({
      crewName: crewName,
      profileImg: profileImg,
      crewIntro: crewIntro,
      ownerName: userInfo.userName,
    });
    ctx.body = { status: 200, resultCode: 1 };
  }
};

// 크루 가입
exports.JoinCrew = async (ctx) => {
  const crewName = ctx.request.body;
  // const crew
};
