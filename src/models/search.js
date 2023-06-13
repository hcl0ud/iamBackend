const { db } = require("./index");
const board = db.collection("board");

// 텍스트 인덱스 생성
board.createIndex({ boardTitle: "text", boardcontents: "text" });

exports.search = async (ctx) => {
  const { keyword } = ctx.request.body;

  const indexes = await board.getIndexes();
  const textIndex = indexes.find((index) => {
    return (
      index.hasOwnProperty("key") &&
      index.key.hasOwnProperty("boardTitle") &&
      index.key.hasOwnProperty("boardcontents")
    );
  });

  if (textIndex) {
    const data = await board.find({ $text: { $search: keyword } }).toArray();

    if (data.length > 0) {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: data.reverse(),
      };
    } else {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: "데이터 조회 실패",
      };
    }
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "텍스트 인덱스가 존재하지 않습니다.",
    };
  }
};
