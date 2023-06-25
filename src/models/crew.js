const { db } = require(".");
const { ObjectId } = require("mongodb");
const user = db.collection("user");
const crew = db.collection("crew");

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
        .then((r) => {
          ctx.body = { status: 200, resultCode: 1 };
        })
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
exports.JoinCrew = async (ctx) => {
  const { userIdx, crewIdx } = ctx.request.body;
  const _id = new ObjectId(crewIdx);
  const userInfo = await user.findOne({ userEmail: userIdx });
  const crewData = await crew.findOne({ _id: _id });

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
        msg: e,
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

exports.getcrewBoardList = async (ctx) => {
  const data = await crewboard.find({}, {}).toArray();
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

exports.writecrewBoard = async (ctx) => {
  let now = dayjs();
  let time = now.format().slice(0, 19).split("T").join(" ");

  if (ctx.request.body) {
    const { crewTitle, crewContents, crewName, userEmail } = ctx.request.body;
    const crewInfo = await crew.findOne({ crewName: crewName });
    const userInfo = await user.findOne({ userEmail: userEmail })

    await crewboard
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

exports.deletecrewBoard = (ctx) => {
  const _id = new ObjectId(ctx.query.id);

  crewboard
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

exports.getcrewBoardDetail = async (ctx) => {
  const _id = new ObjectId(ctx.query.id);

  await board
    .findOne({ _id: _id })
    .then((boardData) => {
      ctx.body = {
        status: 200,
        resultCode: 1,
        data: boardData,
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

// 크루 정보 + 해당크루 게시글 불러오기
