const { db } = require("./index");
const dayjs = require("dayjs");

let now = dayjs();
let time = now.format().slice(0, 16).split("T").join(" ");

const board = db.collection("board");

exports.getBoardData = async (ctx) => {
  const data = await board.find();

  try {
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: data,
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
  const { title, contents } = ctx.request.body;

  await board
    .insertOne({
      writeTime: time,
      boardTitle: title,
      boardContents: contents,
    })
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, error: e };
    });
};
