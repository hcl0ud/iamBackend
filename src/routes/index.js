const Router = require("@koa/router");
const router = new Router();

// DB 불러오기
const user = require("../models/user");

// API
router.post("/user/register", user.register).post("/user/login", user.login);

module.exports = router;
