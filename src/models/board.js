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
    const { boardTitle, boardContents, userIdx } = ctx.request.body;
    const userInfo = await user.findOne({ userEmail: userIdx });

    await board
      .insertOne({
        writeTime: time,
        boardTitle: boardTitle,
        boardContents: boardContents,
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



//getBoardDetail, getcommentList, writecomment 

exports.getBoardDetail = async (ctx) => {
  const { writeTime, boardTitle, boardContents, userName } = ctx.request.body;

  if (writeTime && boardTitle && boardContents && userName) {
    const likeCount = 0;

    try {
      const boardData = await board.findOne({
        writeTime,
        boardTitle,
        boardContents,
        userName,
      });

      if (boardData) {
        const { userEmail } = boardData;

        ctx.body = {
          status: 200,
          resultCode: 1,
          data: {
            writeTime,
            boardTitle,
            boardContents,
            userName,
            userEmail,
            likeCount,
          },
        };
      } else {
        ctx.body = {
          status: 200,
          resultCode: 0,
          error: "게시물을 찾을 수 없습니다.",
        };
      }
    } catch (e) {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: "데이터 조회 실패",
        msg: e,
      };
    }
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "게시물 상세 정보를 가져올 수 없습니다.",
    };
  }
};
