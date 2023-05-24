const Router = require("@koa/router");
const router = new Router();

// DB 불러오기
const user = require("../models/user");
const board = require("../models/board");

// API
// USER
router.post("/user/register", user.register);
router.post("/user/login", user.login);

// BOARD
router.post("/board/getBoard", board.getBoardData);

module.exports = router;
