const Router = require("@koa/router");
const router = new Router();

// DB 불러오기

// API
router.post("/", () => {
  console.log("nice request!");
});

module.exports = router;
