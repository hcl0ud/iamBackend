const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");
const board = db.collection("board");
const crewuser = db.collection("crewuser");

// 크루생성
exports.createCrew = async (ctx) => { 

  if (ctx.request.body) {
    

    // 1. 크루 생성
    await crew
      .insertOne({
        crewId: newCrewId,
        crewName: crewName,
        profileimg: profileimg,
        introduction: introduction,
        ownerName: userInfo.userName,
      })
      .then(async () => {
        // 2번 로직: 크루를 생성한 사용자 등록
        await crewuser.UpdateOne({
          crewId: newCrewId,
          userEmail: userInfo.userEmail,
        });
  
        ctx.body = { status: 200, resultCode: 1 };
      })
      .catch((e) => {
        ctx.body = { status: 200, resultCode: 0, error: e };
      });
  } else {
    ctx.body = { status: 200, resultCode: 0, error: "include null data" };
  }
};
