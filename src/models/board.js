const { db } = require("./index");
const dayjs = require("dayjs");

const board = db.collection("board");
const user = db.collection("user");

exports.getBoardList = async (ctx) => {
  const data = await board.find({}, {}).toArray();
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

exports.writeBoard = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  if (ctx.request.body) {
    const { boardTitle, boardContents, userName } = ctx.request.body;
    const userIdx = await user.findOne({
      userEmail: userName.userIdx,
    });

    await board
      .insertOne({
        writeTime: time,
        boardTitle: boardTitle,
        boardContents: boardContents,
        userName: userIdx.userName,
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

exports.getBoardDetail = async (ctx) => {};
