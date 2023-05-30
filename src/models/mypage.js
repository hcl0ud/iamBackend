const { db } = require("./index");
const multer = require("koa-multer");

const mypage = db.collection("mypage");

const upload = multer({ dest: "uploads/" });


router.post("/upload-profile-photo", upload.single("photo"), async (ctx) => {
  const userIdx = ctx.state.userIdx;
  const file = ctx.request.file;

  // 파일 업로드 성공 시, 파일 경로를 DB에 저장합니다.
  if (file) {
    const photoPath = file.path;
    await user.updateOne({ userIdx: userIdx }, { $set: { photoPath: photoPath } });
    ctx.body = { status: 200, resultCode: 1, message: "프로필 사진이 업로드되었습니다." };
  } else {
    ctx.body = { status: 400, resultCode: 0, error: "파일 업로드에 실패했습니다." };
  }
});

router.post("/update-introduction", async (ctx) => {
  const userIdx = ctx.state.userIdx;
  const { introduction } = ctx.request.body;

  await user.updateOne({ userIdx: userIdx }, { $set: { introduction: introduction } });
  ctx.body = { status: 200, resultCode: 1, message: "소개말이 업데이트되었습니다." };
});
