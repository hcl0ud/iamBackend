const { db } = require("./index");
const dayjs = require("dayjs");
const { ObjectId } = require("mongodb");

const board = db.collection("board");
const user = db.collection("user");

exports.getBoardList = async (ctx) => {
  await board
    .find({}, {})
    .toArray()
    .then((r) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: r.reverse(),
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: "데이터 조회 실패",
        err: e,
      };
    });
};

exports.writeBoard = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

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
      comments: [],
    })
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, error: e };
    });
};

exports.deleteBoard = async (ctx) => {
  const { postId } = ctx.request.body;
  const _id = await new ObjectId(postId.slice(4));

  await board
    .deleteOne({ _id: _id })
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, err: e };
    });
};

exports.goToUpdateEdit = async (ctx) => {
  console.log(ctx.request.body);
  const { userIdx, postId } = ctx.request.body;
  const _id = await new ObjectId(postId.slice(4));
  const userInfo = await user.findOne({ userEmail: userIdx });
  const boardData = await board.findOne({ _id: _id });

  if (
    boardData &&
    userInfo &&
    userInfo.userEmail === userIdx &&
    boardData._id.toString() === _id.toString() &&
    boardData.userEmail === userIdx
  ) {
    ctx.body = {
      status: 200,
      resultCode: 1,
      message: "게시물 수정페이지 접근 완료",
    };
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "게시물 수정페이지 접근 오류",
    };
  }
};

exports.getBoardDetail = async (ctx) => {
  const _id = new ObjectId(ctx.query.id);

  await board
    .findOne({ _id: _id })
    .then((r) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: r,
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: "게시물 상세 정보를 가져오는 중에 오류가 발생했습니다.",
        err: e,
      };
    });
};

exports.getCommentList = async (ctx) => {
  const _id = new ObjectId(ctx.query.id);

  await board
    .findOne({ _id: _id })
    .then((r) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: r.comments,
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: "게시물을 찾을 수 없습니다.",
        err: e,
      };
    });
};

exports.updateBoard = async (ctx) => {
  const { boardTitle, boardContents, postId } = ctx.request.body;
  const _id = await new ObjectId(postId.slice(8));

  await board
    .findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          boardTitle: boardTitle,
          boardContents: boardContents,
        },
      },
      { returnOriginal: false }
    )
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: "게시물을 찾을 수 없습니다.",
        err: e,
      };
    });
};

exports.uploadBoardFile = async (ctx) => {
  const { userIdx } = ctx.request.body;

  if (ctx.request.file) {
    await board.insertOne(
      { userEmail: userIdx },
      { $set: { boardImg: ctx.request.file.path } }
    );
    ctx.body = {
      status: 200,
      resultCode: 1,
      message: "사진이 업로드되었습니다.",
    };
  } else {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "사진 업로드에 실패했습니다.",
    };
  }
};

exports.writeComment = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  const { commentContents, userIdx, postId } = ctx.request.body;
  const _id = await new ObjectId(postId.slice(4));
  const userInfo = await user.findOne({ userEmail: userIdx });
  const boardData = await board.findOne({ _id: _id });

  boardData.comments.push({
    writeTime: time,
    commentContents: commentContents,
    userName: userInfo.userName,
    userEmail: userInfo.userEmail,
    profileImg: userInfo.profileImg,
  });

  await board
    .updateOne({ _id: _id }, { $set: boardData })
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        msg: "댓글을 찾을 수 없습니다.",
        err: e,
      };
    });
};

exports.deleteComment = async (ctx) => {
  const { userIdx, postId } = ctx.request.body;
  const _id = await new ObjectId(postId.slice(4));

  await board
    .findOneAndUpdate(
      { _id: _id, comments: { userEmail: userIdx } },
      { $pull: { comments: { userEmail: userIdx } } },
      { new: true }
    )
    .then((ctx.body = { status: 200, resultCode: 1, msg: "댓글 삭제 완료" }))
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, err: e };
    });
};

exports.search = async (ctx) => {
  const { searchQuery } = ctx.request.body;
  await board.createIndex({ boardTitle: "text", boardContents: "text" });
  await board
    .find({ $text: { $search: searchQuery.toString() } })
    .toArray()
    .then((r) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: r,
      };
    })
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        err: e,
      };
    });
};
