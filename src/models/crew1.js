const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");
const crewuser = db.collection("crewuser");
const board = db.collection("board");


// 크루생성
exports.createCrew = async (ctx) => { 

  if (ctx.request.body) {

    // 현재 등록된 크루중 id 값이 최대인 크루 조회
    const maxCrew = await crew.findOne({}, {});

    const newCrewId = maxCrew + 1;

    const { crewName, profileimage, introduction } = ctx.request.body;
    const userInfo = await user.findOne({ userEmail: userIdx });

     // 1. 크루생성
     await crew
      .insertOne({
        crewId: newCrewId,
        crewName: crewName,
        profileimage: profileimage,
        introduction: introduction,
        ownerName: userInfo.userName,
      })
      .then((ctx.body = { status: 200, resultCode: 1 }))
      .catch((e) => {
        ctx.body = { status: 200, resultCode: 0, error: e };
      });


      // 2. 크루사용자 등록
      await crewuser
      .insertOne({
        crewId: newCrewId,
        userName: userInfo.userName,
      })
      .then((ctx.body = { status: 200, resultCode: 1 }))
      .catch((e) => {
        ctx.body = { status: 200, resultCode: 0, error: e };
      });

    } else {
    ctx.body = { status: 200, resultCode: 0, error: "include null data" };
  }

}

// 특정크루 게시물 전체 조회
exports.getCrewBoardList = async (ctx) => {

  // 현재 선택된 크루의 모든 게시물 조회
  // 최신순으로 조회

  const { crewId } = ctx.request.body;
  const data = await board.find({ crewId: crewId }, {}).toArray();
  
  try {
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: data.reverse(),
    };
  } catch (e) {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "데이터 조회 실패",
      msg: e,
    };
  }

}