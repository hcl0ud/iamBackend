const { db } = require("./index");

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
