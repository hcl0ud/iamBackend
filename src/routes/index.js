const Router = require("@koa/router");
const router = new Router();

// DB 불러오기
const user = require("../models/user");
const board = require("../models/board");

// API
// USER
router
  .post("/user/register", user.register)
  .post("/user/login", user.login)
  .post("/user/getUserInfo", user.getUserInfo);

// BOARD
router
  .post("/board/getBoard", board.getBoardData)
  .post("/board/writeBoard", board.writeBoard);

module.exports = router;
