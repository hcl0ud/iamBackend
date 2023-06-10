require("dotenv").config();
const { FTP_URI } = process.env;

const multer = require("multer");
const upload = multer({ dest: FTP_URI });

exports.singleFileUpload = async (ctx) => {
  const {
    fieldname,
    originalname,
    encoding,
    mimetype,
    destination,
    filename,
    path,
    size,
  } = ctx.request.file;
  const { name } = ctx.request.body;

  console.log("body 데이터 : ", name);
  console.log("폼에 정의된 필드명 : ", fieldname);
  console.log("사용자가 업로드한 파일 명 : ", originalname);
  console.log("파일의 엔코딩 타입 : ", encoding);
  console.log("파일의 Mime 타입 : ", mimetype);
  console.log("파일이 저장된 폴더 : ", destination);
  console.log("destinatin에 저장된 파일 명 : ", filename);
  console.log("업로드된 파일의 전체 경로 ", path);
  console.log("파일의 바이트(byte 사이즈)", size);

  ctx.body = { ok: true, data: "Single Upload Ok" };
};

module.exports = { upload };
