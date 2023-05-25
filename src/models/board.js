const { db } = require("./index");
const dayjs = require("dayjs");

const board = db.collection("board");

exports.getBoardData = async (ctx) => {
  const data = await board.find({}, {}).toArray();
  try {
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: data.reverse(),
    };
  } catch (error) {
    ctx.body = {
      status: 500,
      resultCode: 0,
      error: "데이터 조회 실패",
    };
  }
};

exports.writeBoard = async (ctx) => {
  const { boardTitle, boardContents, userName } = ctx.request.body;

  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  await board
    .insertOne({
      writeTime: time,
      boardTitle: boardTitle,
      boardContents: boardContents,
      userName: userName,
      likeCount: 0,
    })
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, error: e };
    });
};
