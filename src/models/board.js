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

exports.getBoardDetail = async (ctx) => {
  const { _id } = ctx.request.body;

  if (_id) {
    const boardData = await board.findOne({ _id: _id });

    if (boardData) {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: boardData,
      };
    } else {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: "게시물을 찾을 수 없습니다.",
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

exports.deleteBoard = async (ctx) => {
  const { postId } = ctx.request.body;

  try {
    const result = await board.deleteOne({ _id: postId });

    if (result.deletedCount === 1) {
      ctx.body = { status: 200, resultCode: 1, message: "게시물을 삭제하였습니다." };
    } else {
      ctx.body = { status: 200, resultCode: 0, error: "게시물 삭제 오류" };
    }
  } catch (e) {
    ctx.body = { status: 200, resultCode: 0, error: e };
  }
};

exports.search = async (ctx) => {
  const { searchQuery } = ctx.request.body;
  if (searchQuery) {
    const data = await board
      .find({ $text: { $search: searchQuery } })
      .toArray();
    if (data) {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: data,
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
      error: "search) include null data",
    };
  }
};

exports.getCommentList = async (ctx) => {

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

exports.writeComment = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  if (ctx.request.body) {
    const { commentContents, userIdx } = ctx.request.body;
    const userInfo = await user.findOne({ userEmail: userIdx });

    await board
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

exports.deleteComment = async (ctx) => {
  const { commentId } = ctx.request.body;

  try {
    const result = await board.deleteOne({ _id: commentId });

    if (result.deletedCount === 1) {
      ctx.body = { status: 200, resultCode: 1, message: "댓글을 삭제하였습니다." };
    } else {
      ctx.body = { status: 200, resultCode: 0, error: "댓글 삭제 오류" };
    }
  } catch (e) {
    ctx.body = { status: 200, resultCode: 0, error: e };
  }
};