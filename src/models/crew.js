const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");

// 크루생성
exports.createCrew = async (ctx) => {
  const { crewName, thumbnail, crewIntro, userIdx } = ctx.request.body;
  const userInfo = await user.findOne({ userEmail: userIdx });

  // 중복 크루 체크
  await crew
    .findOne({ crewName: crewName })
    .then(
      await crew
        .insertOne({
          crewName: crewName,
          profileImg: profileImg,
          crewIntro: crewIntro,
          ownerName: {
            userEmail: userInfo.userEmail,
            userName: userInfo.userName,
          },
          crewMember: {
            userEmail: userInfo.userEmail,
            userName: userInfo.userName,
          },
        })
        .then((r) => {
          ctx.body = { status: 200, resultCode: 1 };
        })
        .catch((e) => {
          ctx.body = { status: 200, resultCode: 0, msg: e };
        })
    )
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: e,
        msg: "중복된 크루명입니다",
      };
    });
};

// 크루 가입
exports.JoinCrew = async (ctx) => {
  const { userIdx, crewName } = ctx.request.body;
  const userInfo = await user.findOne({ userEmail: userIdx });

  await crew
    .updateOne(
      { crewName: crewName },
      {
        crewMember: {
          userEmail: userInfo.userEmail,
          userName: userInfo.userName,
        },
      }
    )
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: e,
      };
    });
};

// 전체크루목록 불러오기
exports.getCrewList = async (ctx) => {
  await crew
    .find()
    .toArray()
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
        error: e,
      };
    });
};

// 크루 글쓰기

// 크루 정보 + 해당크루 게시글 불러오기
