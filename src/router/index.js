const Router = require("@koa/router");
const router = new Router();

// DB 불러오기

// API
router.post("/", () => {
  return {
    Msg: "success!",
  };
});

module.exports = router;
