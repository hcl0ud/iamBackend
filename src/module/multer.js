const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");

const profileImg = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.readdir(
        path.resolve("uploads/profile/", req.body.userIdx),
        (e) => {
          if (e) {
            console.log(e);
            fs.promises.mkdir(
              path.resolve("uploads/profile/", req.body.userIdx),
              { recursive: true }
            );
          }
          cb(null, path.join("uploads", "profile", req.body.userIdx));
        }
      );
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});

const boardImg = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.readdir(path.resolve("uploads/board/", req.body._id), (e) => {
        if (e) {
          console.log(e);
          fs.promises.mkdir(path.resolve("uploads/board/", req.body._id), {
            recursive: true,
          });
        }
        cb(null, path.join("uploads", "board", req.body._id));
      });
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});
module.exports = { profileImg, boardImg };
