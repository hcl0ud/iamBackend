const { db } = require(".");
const { ObjectId } = require("mongodb");
const dayjs = require("dayjs");
const user = db.collection("user");
const crew = db.collection("crew");
const crewBoard = db.collection("crewBoard");

// 크루생성
exports.createCrew = async (ctx) => {
  const { crewName, profileImg, crewIntro, userIdx } = ctx.request.body;
  const userInfo = await user.findOne({ userEmail: userIdx });

  // 중복 크루 체크
  await crew
    .findOne({ crewName: crewName })
    .then(
      await crew
        .insertOne({
          crewName: crewName,
          profileImg: profileImg,
          crewIntro: crewIntro,
          ownerName: {
            userEmail: userInfo.userEmail,
            userName: userInfo.userName,
          },
          crewMember: [
            {
              userEmail: userInfo.userEmail,
              userName: userInfo.userName,
            },
          ],
        })
        .then((ctx.body = { status: 200, resultCode: 1 }))
        .catch((e) => {
          ctx.body = { status: 200, resultCode: 0, msg: e };
        })
    )
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: e,
        msg: "중복된 크루명입니다",
      };
    });
};

// 크루 가입
exports.joinCrew = async (ctx) => {
  const { userIdx, crewIdx } = ctx.request.body;
  const _id = new ObjectId(crewIdx);
  const userInfo = await user.findOne({ userEmail: userIdx });
  const crewData = await crew.findOne({ _id: _id });

  // 사용자의 이메일이 이미 크루 멤버 목록에 있는지 확인
  const sameMember = crewData.crewMember.some(
    (member) => member.userEmail === userInfo.userEmail
  );

  if (sameMember) {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "이미 크루에 가입된 사용자입니다.",
    };
    return;
  }

  crewData.crewMember.push({
    userEmail: userInfo.userEmail,
    userName: userInfo.userName,
  });

  await crew
    .updateOne(
      { _id: _id },
      {
        $set: crewData,
      }
    )
    .then((ctx.body = { status: 200, resultCode: 1 }))
    .catch((e) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: e,
      };
      console.log(e);
    });
};

// 전체크루목록 불러오기
exports.getCrewList = async (ctx) => {
  await crew
    .find()
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
        error: e,
      };
    });
};

// 크루 글쓰기

exports.getCrewBoardList = async (ctx) => {
  const _id = new ObjectId(ctx.query.id);

  try {
    const data = await crewBoard.find({}, {}).toArray();

    const result = await crewBoard.findOne({ _id: _id });

    ctx.body = {
      status: 200,
      resultCode: 1,
      data: data.reverse(),
    };
  } catch (error) {
    ctx.body = {
      status: 200,
      resultCode: 0,
      error: "게시물을 찾을 수 없습니다.",
      msg: error.message,
    };
  }
};

exports.writeCrewBoard = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  if (ctx.request.body) {
    const { crewTitle, crewContents, crewName, userIdx } = ctx.request.body;
    const crewInfo = await crew.findOne({ crewName: crewName });
    const userInfo = await user.findOne({ userEmail: userIdx });

    await crewBoard
      .insertOne({
        writeTime: time,
        crewTitle: crewTitle,
        crewContents: crewContents,
        crewName: crewInfo.crewName,
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

exports.deleteCrewBoard = async (ctx) => {
  const _id = new ObjectId(ctx.query.id);

  await crewBoard
    .deleteOne({ _id: _id })
    .then((deletedBoard) => {
      if (deletedBoard) {
        ctx.body = { status: 200, resultCode: 1, error: "게시물 삭제 완료" };
      } else {
        ctx.body = { status: 200, resultCode: 0, error: "게시물 삭제 오류" };
      }
    })
    .catch((e) => {
      ctx.body = { status: 200, resultCode: 0, error: e };
    });
};

exports.getCrewBoardDetail = async (ctx) => {
  const crewName = new ObjectId(ctx.query.crewName);

  await crewBoard
    .findOne({ crewName: crewName })
    .then((crewBoardData) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: crewBoardData,
      };
    })
    .catch((error) => {
      ctx.body = {
        status: 200,
        resultCode: 0,
        error: "게시물 상세 정보를 가져오는 중에 오류가 발생했습니다.",
        message: error.message,
      };
    });
};

// 특정 크루 게시물 불러오기
exports.getCrewBoards = async (ctx) => {
  const crewName = ctx.query.crewName;

  const data = await crewBoard.find({ crewName: crewName });

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
      error: "게시물을 가져오는 중에 오류가 발생했습니다.",
    };
  }
};
