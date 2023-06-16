const { db } = require("../models");
const user = db.collection("user");
const board = db.collection("crew");

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
    const { title, content } = ctx.request.body;

    // 중복된 크루명인지 확인
    const existingCrew = await board.findOne({ name: title });
    if (existingCrew) {
      ctx.body = {
        status: 409,
        error: "이미 존재하는 크루명입니다.",
      };
      return;
    }

    // 새로운 크루 생성
    const newCrew = {
      name: title,
      introduction: content,
      profileImage: "",
    };

    try {
      await board.insertOne(newCrew);
      ctx.body = {
        status: 201,
        message: "크루가 성공적으로 생성되었습니다.",
      };
    } catch (e) {
      ctx.body = {
        status: 500,
        error: "크루 생성 중 오류가 발생했습니다.",
      };
    }
  } else {
    ctx.body = { status: 400, error: "include null data" };
  }
};

exports.getBoardDetail = async (ctx) => {
  const { crewId } = ctx.params;

  try {
    const crew = await board.findOne({ _id: crewId });

    if (crew) {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: crew,
      };
    } else {
      ctx.body = {
        status: 404,
        error: "크루를 찾을 수 없습니다.",
      };
    }
  } catch (e) {
    ctx.body = {
      status: 500,
      error: "크루 조회 중 오류가 발생했습니다.",
    };
  }
};

exports.writePost = async (ctx) => {
  const { crewId } = ctx.params;
  const { title, content } = ctx.request.body;

  const newPost = {
    title,
    content,
  };

  try {
    const result = await board.insertOne(newPost);
    const postId = result.insertedId;

    const updateResult = await board.updateOne(
      { _id: crewId },
      { $push: { posts: postId } }
    );

    if (updateResult.modifiedCount === 1) {
      ctx.body = {
        status: 201,
        message: "게시물이 성공적으로 생성되었습니다.",
      };
    } else {
      ctx.body = {
        status: 404,
        error: "크루를 찾을 수 없습니다.",
      };
    }
  } catch (e) {
    ctx.body = {
      status: 500,
      error: "게시물 생성 중 오류가 발생했습니다.",
    };
  }
};

exports.getPostList = async (ctx) => {
  const { crewId } = ctx.params;

  try {
    const crew = await board
      .findById(crewId)
      .populate("posts")
      .sort({ "posts.createdAt": -1 })
      .exec();

    if (crew) {
      ctx.body = crew.posts;
    } else {
      ctx.body = {
        status: 404,
        error: "크루를 찾을 수 없습니다.",
      };
    }
  } catch (e) {
    ctx.body = {
      status: 500,
      error: "게시물 조회 중 오류가 발생했습니다.",
    };
  }
};

exports.deletePost = async (ctx) => {
  const { crewId, postId } = ctx.params;

  try {
    const result = await board.deleteOne({ _id: postId });

    if (result.deletedCount === 1) {
      const updateResult = await board.updateOne(
        { _id: crewId },
        { $pull: { posts: postId } }
      );

      if (updateResult.modifiedCount === 1) {
        ctx.body = {
          status: 200,
          message: "게시물을 삭제하였습니다.",
        };
      } else {
        ctx.body = {
          status: 404,
          error: "크루를 찾을 수 없습니다.",
        };
      }
    } else {
      ctx.body = {
        status: 500,
        error: "게시물 삭제 오류",
      };
    }
  } catch (e) {
    ctx.body = {
      status: 500,
      error: e,
    };
  }
};
