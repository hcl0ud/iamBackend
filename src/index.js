require("dotenv").config();
const { API_IP, API_PORT } = process.env;

const Koa = require("koa");
const cors = require("@koa/cors");
const parser = require("koa-bodyparser");
const router = require("./routes");
const serve = require("koa-static");
const path = require("path");
const mount = require("koa-mount");

const app = new Koa();
const dirPath = path.resolve("./uploads");
const front = path.resolve("./public");

app
  .use(cors())
  .use(parser({ multipart: true, urlencoded: true }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(mount("/", serve(front)))
  .use(mount("/uploads", serve(dirPath)))
  .listen(API_PORT, () => {
    console.log(`Connected to http://${API_IP}:${API_PORT}`);
  });
