const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");

exports.profileImg = multer({
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

exports.boardImg = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.readdir(path.resolve("uploads/board/", req.body._id), (e) => {
        if (e) {
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

exports.crewImg = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.readdir(
        path.resolve("uploads/crewImg/", req.body.crewName),
        (e) => {
          if (e) {
            fs.promises.mkdir(
              path.resolve("uploads/crewImg/", req.body.crewName),
              { recursive: true }
            );
          }
          cb(null, path.join("uploads", "crewImg", req.body.crewName));
        }
      );
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});
