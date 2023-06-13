const { db } = require("./index");
const dayjs = require("dayjs");

const comment = db.collection("comment"); // comment DB 추가
const user = db.collection("user");


exports.getcommentList = async (ctx) => {
  const data = await comment.find({}, {}).toArray();
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

exports.writecomment = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  if (ctx.request.body) {
    const { commentContents, userIdx } = ctx.request.body;
    const userInfo = await user.findOne({ userEmail: userIdx });

    await comment
      .insertOne({
        writeTime: time,
        commentContents: commentContents,
        userName: userInfo.userName,
        userEmail: userInfo.userEmail,
        likeCount: 0,
      })
      .then((ctx.body = { status: 200, resultCode: 1 }))
      .catch((e) => {
        ctx.body = { status: 200, resultCode: 0, error: e };
      });
  } else {
    ctx.body = { status: 200, resultCode: 0, error: "include null data" };
  }
};
