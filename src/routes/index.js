const Router = require("@koa/router");
const router = new Router({ prefix: "/" });

// DB 불러오기
const user = require("../models/user");
const board = require("../models/board");

// USER
router
  .post("user/register", user.register)
  .post("user/login", user.login)
  .post("user/getUserInfo", user.getUserInfo)
  .post("user/getBoardList", user.getBoardList);
// BOARD
router
  .post("board/getBoardList", board.getBoardList)
  .post("board/writeBoard", board.writeBoard);

module.exports = router;
