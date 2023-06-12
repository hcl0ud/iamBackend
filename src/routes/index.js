const Router = require("@koa/router");
const router = new Router({ prefix: "/" });

// API 연결
const user = require("../models/user");
const board = require("../models/board");
const search = require("../models/search");
const comment = require("../models/comment"); // comment DB 추가


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
  .post("board/getBoardDetail", board.getBoardDetail) // 6.13 
  .post("board/getcommentList", comment.getcommentList) // 6.13
  .post("board/writecomment", comment.writecomment); // 6.13 

// SEARCH
router.post("search", search.search);

module.exports = router;
