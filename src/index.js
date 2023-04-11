require("dotenv").config();
const { API_IP, API_PORT } = process.env;

const Koa = require("koa");
const cors = require("@koa/cors");
const parser = require("koa-bodyparser");
const router = require("./routes");

const app = new Koa();

app
  .use(cors())
  .use(parser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(API_PORT, () => {
    console.log(`Connected to http://${API_IP}:${API_PORT}`);
  });
