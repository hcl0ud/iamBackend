require("dotenv").config();

const Koa = require("koa");
const cors = require("@koa/cors");
const parser = require("koa-bodyparser");
const router = require("./router");

const app = new Koa();
const ip = process.env.DOMAIN;
const port = process.env.PORT;

app
  .use(cors())
  .use(parser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`Connected to http://${ip}:${port}`);
  });
