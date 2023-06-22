const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");
const board = db.collection("board");

// 크루생성
  exports.createCrew = async (ctx) => { 

    const { crewName, profileimag, introduction, userIdx} = ctx.request.body;
    //이러면 UserName 이 중복된 사람들끼리일땐 어떻게 하지
    const userInfo = await user.findOne({ userName: userIdx });
    const UserName = db.collection("user");

    // 추가되는 크루정보

    await crew {
      .insertOne({
        crewId: newCrewId,
        crewName: crewName,
        profileimag: profileimg,
        introduction: introduction,
        ownerName: userInfo.userName,
      })
    };

  // 동일한 크루명이 있는지 확인
  try {
    const SamecrewName = await crew.findeOne ({CrewName});
    if (SamecrewName) {
      ctx.body = {status: 200, resultCode: 1, error: "중복된 크루명입니다"};
      return;
    }

// 크루 가입
exports.JoinCrew = async (ctx) => {
  const crewName = request.body
  const crew

}