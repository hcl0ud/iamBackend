const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");
const board = db.collection("board");

// 크루 생성
exports.createCrew = async (ctx) => {
  if (ctx.request.body) {
    const maxCrew = await crew.find({ crewId: crewId }, {}).toArray();
    const currentCrewCount = maxCrew.length;
    const newCrewId = currentCrewCount + 1;
    const { crewName, profileimage, introduction, inviteUserList } = ctx.request.body;
    const userInfo = await user.findOne({ userName: userIdx });
    const userIdx = 123; // 사용할 userIdx 값
    const url = `http://localhost:5173/CrewMain?userIdx=${userIdx}`;

    // 1. 크루 생성
    await crew
      .insertOne({
        crewId: newCrewId,
        crewName: crewName,
        profileimag: profileimg,
        introduction: introduction,
        ownerName: userInfo.userName,
      })
      .then(async () => {
        // 2번 로직: 크루를 생성한 사용자 등록
        await crewuser.UpdateOne({
          crewId: newCrewId,
          userEmail: userInfo.userEmail,
        });
  
        // 3번 로직: 크루에 초대받은 사용자 등록 이미 가입한 크루일경우 가입 불가능
        if (inviteUserList && inviteUserList.length > 0) {
          for (const invitedUser of inviteUserList) {
            // 초대받은 사용자가 이미 해당 크루에 등록되어 있는경우
            const existingUser = await crewuser.findeOne({
              crewId: newCrewId,
              userEmail: inviteUser,
            })

            if (!existingUser) {
              await crewuser.UpdateOne({
                crewId: newCrewId,
                userEmail: invitedUser,
            });
          }
        }
      } 
        ctx.body = { status: 200, resultCode: 1 };
      })
      .catch((e) => {
        ctx.body = { status: 200, resultCode: 0, error: e };
      });
  } else {
    ctx.body = { status: 200, resultCode: 0, error: "include null data" };
  }
};

// 특정 크루 게시물 전체 조회
exports.getCrewBoardList = async (ctx) => {
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
};
