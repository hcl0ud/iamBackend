const Router = require("@koa/router");
const router = new Router();

// DB 불러오기

// API
router.post("/", () => {
  const data = {
    Msg: "success!",
  };

  return data;
});

module.exports = router;
