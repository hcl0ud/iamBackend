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
        profileImg: userInfo.profileImg,
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

exports.getBoardDetail = (ctx) => {
  const { _id } = ctx.query;

  if (_id) {
    board
      .findOne({ _id })
      .then((boardData) => {
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
      })
      .catch((error) => {
        ctx.body = {
          status: 200,
          resultCode: 0,
          error: "게시물 상세 정보를 가져오는 중에 오류가 발생했습니다.",
          message: error.message,
        };
      });
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "게시물 상세 정보를 가져올 수 없습니다.",
    };
  }
};

exports.deleteBoard = (ctx) => {
  const { postId } = ctx.query;

  board
    .deleteOne({ _id: postId })
    .then((deletedBoard) => {
      if (deletedBoard) {
        ctx.response.redirect("/index.html");
      } else {
        ctx.body = { status: 200, resultCode: 0, error: "게시물 삭제 오류" };
      }
    })
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, error: e };
    });
};

exports.getCommentList = async (ctx) => {
  const postId = ctx.query.postId;
  if (postId) {
    const boardData = await board.findOne({ _id: postId });

    if (boardData) {
      const comments = boardData.comments;

      ctx.body = { status: 200, resultCode: 1, comments };
    } else {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: "게시물을 찾을 수 없습니다.",
      };
    }
  } else {
    ctx.body = { status: 200, resultCode: 0, error: "postId를 지정해주세요." };
  }
};

exports.writeComment = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  if (ctx.request.body) {
    const { commentContents, userIdx, postId } = ctx.request.body;
    const userInfo = await user.findOne({ userEmail: userIdx });
    const boardData = await board.findOne({ _id: postId });

    if (boardData) {
      const newComment = {
        writeTime: time,
        commentContents: commentContents,
        userName: userInfo.userName,
        userEmail: userInfo.userEmail,
        likeCount: 0,
      };

      await boardData.comments.insertOne(newComment);

      ctx.body = { status: 200, resultCode: 1 };
    } else {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: "게시물을 찾을 수 없습니다.",
      };
    }
  } else {
    ctx.body = { status: 200, resultCode: 0, error: "include null data" };
  }
};

exports.deleteComment = async (ctx) => {
  const { commentId, postId } = ctx.query;

  const boardData = await board.findOne({ _id: postId });

  if (boardData) {
    const deletionResult = await boardData.comments.deleteOne({
      _id: commentId,
    });

    if (deletionResult !== null && deletionResult !== undefined) {
      ctx.body = {
        status: 200,
        resultCode: 1,
        message: "댓글을 삭제하였습니다.",
      };
    } else {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: "댓글을 찾을 수 없습니다.",
      };
    }
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "게시물을 찾을 수 없습니다.",
    };
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
