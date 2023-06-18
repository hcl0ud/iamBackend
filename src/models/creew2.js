const { db } = require("../models");
const user = db.collection("user");
const crewuser = db.collection("crewuser");

exports.joinCrew = async (ctx) => { 

  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

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

}

exports.getCrewList = async (ctx) => {

  const data = await crew.find({}, {}).toArray();
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

