const Router = require("@koa/router");
const router = new Router({ prefix: "/" });

// API 연결
const user = require("../models/user");
const board = require("../models/board");
const crew = require("../models/crew");

// File Sever
const { upload } = require("../module/multer");

// USER
router
  .post("user/register", user.register)
  .post("user/login", user.login)
  .post("user/getUserInfo", user.getUserInfo)
  .post("user/getBoardList", user.getBoardList)
  .post("user/updateProfile", user.updateProfile)
  .post("user/uploadProfile", upload.single("file"), user.uploadProfilePicture);

// BOARD
router
  .get("board/getBoardDetail", board.getBoardDetail)
  .get("board/getCommentList", board.getCommentList)
  .post("board/deleteComment", board.deleteComment)
  .post("board/deleteBoard", board.deleteBoard)
  .post("board/getBoardList", board.getBoardList)
  .post("board/writeBoard", board.writeBoard)
  .post("board/writeComment", board.writeComment)
  .post("board/search", board.search);

// crew
router
  .get("crew/getCrewBoardDetail", crew.getCrewBoardDetail)
  .get("crew/deleteCrewBoard", crew.deleteCrewBoard)
  .get("crew/getCrewBoardList", crew.getCrewBoardList)
  .get("crew/getCrewBoards", crew.getCrewBoards)
  .post("crew/writeCrewBoard", crew.writeCrewBoard)
  .post("crew/createCrew", crew.createCrew)
  .post("crew/joinCrew", crew.joinCrew)
  .post("crew/getCrewList", crew.getCrewList);

module.exports = router;
