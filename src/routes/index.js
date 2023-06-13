const Router = require("@koa/router");
const router = new Router({ prefix: "/" });

// API 연결
const user = require("../models/user");
const board = require("../models/board");

// File Sever
const { upload } = require("../module/ftp");

// USER
router
  .post("user/register", user.register)
  .post("user/login", user.login)
  .post("user/getUserInfo", user.getUserInfo)
  .post("user/getBoardList", user.getBoardList)
  .post("user/updateProfile", user.updateProfile)
  .post(
    "user/uploadProfile/profilePicture",
    upload.single("file"),
    user.uploadProfilePicture
  );

// BOARD
router
  .post("board/getBoardList", board.getBoardList)
  .post("board/writeBoard", board.writeBoard)
  .post("board/getBoardDetail", board.getBoardDetail)
  .post("board/deleteBoard", board.deleteBoard)
  .post("board/getCommentList", board.getCommentList)
  .post("board/writeComment", board.writeComment)
  .post("board/deleteComment", board.deleteComment)
  .post("board/search", board.search);

module.exports = router;
