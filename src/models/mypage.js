const { db } = require("./index");
const multer = require("koa-multer");

const user = db.collection("user");

// 파일 업로드를 위한 Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload-profile-photo", upload.single("photo"), async (ctx) => {
  const userIdx = ctx.state.userIdx;
  const file = ctx.request.file;

  // 파일 업로드 성공 시, 파일 경로를 DB에 저장합니다.
  if (file) {
    const photoPath = file.path;
    await user.findOne({ userIdx: userIdx }, { $set: { photoPath: photoPath } });
    ctx.body = { status: 200, resultCode: 1, message: "프로필 사진이 업로드되었습니다." };
  } else {
    ctx.body = { status: 200, resultCode: 0, error: "파일 업로드에 실패했습니다." };
  }
});

router.post("/update-introduction", async (ctx) => {
  const userIdx = ctx.state.userIdx;
  const { introduction } = ctx.request.body;

  await user.findOne({ userIdx: userIdx }, { $set: { introduction: introduction } });
  ctx.body = { status: 200, resultCode: 1, message: "소개말이 업데이트되었습니다." };
});

exports.getBoardList = async (ctx) => {
  const { userIdx } = ctx.request.body
  const data = await board.find({userEmail:userIdx}, {}).toArray();
  try {
    ctx.body = {
      status: 200,
      resultCode: 1,
      data: data.reverse(),
    };
  } catch (error) {
    ctx.body = {
      status: 500,
      resultCode: 0,
      error: "데이터 조회 실패",
    };
  }
};
