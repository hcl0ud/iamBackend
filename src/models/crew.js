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
  const { userIdx, crewName } = ctx.request.body;
  
  const crewUserData = {
    userIdx: userIdx,
    crewName: crewName
  };

  await db.collection("crewuser").insertOne(crewUserData);

  ctx.body = { status: 200, resultCode: 1 };
};

// 전체크루목록 불러오기

exports.getCrewList = async (ctx) => {
  try {
    const crewList = await crew.find().toArray();

    ctx.body = {
      status: 200,
      resultCode: 1,
      data: crewList,
    };
  } catch (error) {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "크루 목록 조회 실패",
    };
  }
};

// 크루 글쓰기

// 크루 정보 + 해당크루 게시글 불러오기