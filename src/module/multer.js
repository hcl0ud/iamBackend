const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.readdir("uploads/profile/" + req.body.userIdx, (e) => {
        console.log(e);
        if (e) {
          console.log(e);
          fs.mkdirSync("uploads/profile/" + req.body.userIdx);
        }
        cb(null, "uploads/profile/" + req.body.userIdx);
      });
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});

module.exports = { upload };
