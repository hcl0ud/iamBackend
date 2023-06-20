const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.readdir(
        path.resolve("uploads/profile/", req.body.userIdx),
        (e) => {
          if (e) {
            fs.promises.mkdir(
              path.resolve("uploads/profile/", req.body.userIdx),
              { recursive: true }
            );
          }
          cb(null, path.resolve("uploads/profile/", req.body.userIdx));
        }
      );
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});

module.exports = { upload };
