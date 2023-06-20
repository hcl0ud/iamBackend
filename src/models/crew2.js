const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");
const crewuser = db.collection("crewuser");

// 크루가입
exports.joinCrew = async (ctx) => {
  if (ctx.request.body) {
    const { crewId } = ctx.request.body;
    const userInfo = await user.findOne({ userEmail: userIdx });

    await crewuser
      .insertOne({
        crewId: crewId,
        userName: userInfo.userName,
      })
      .then((ctx.body = { status: 200, resultCode: 1 }))
      .catch((e) => {
        ctx.body = { status: 200, resultCode: 0, error: e };
      });
  } else {
    ctx.body = { status: 200, resultCode: 0, error: "include null data" };
  }
};

// 추천크루조회
exports.getCrewList = async (ctx) => {
  // 미가입된 크루중 우선 조회되는 3건
  // crew, crewuser 조인 필요
  const userInfo = await user.findOne({ userEmail: userIdx });
  const crewuserList = await crewuser
    .find({ userName: userInfo.userName }, {})
    .toArray();
  const crewList = await crew.find({}, {}).toArray();

  let data = new Array(3);
  let dataCnt = 0;

  for (const crew of crewList) {
    const joined = false;

    for (const crewuser of crewuserList) {
      if (crew.crewId === crewuser.crewId) {
        joined = true;
        break;
      }
    }

    if (!joined) {
      data.add(crew);
      dataCnt++;
    }

    if (dataCnt == 3) {
      break;
    }
  }

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
