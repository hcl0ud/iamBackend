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
          cb(null, "uploads/profile/", req.body.userIdx);
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
        cb(null, "uploads/board/", req.body._id);
      });
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});

exports.crewprofileImg = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      await fs.readdir(
        path.resolve("uploads/crewprofile/", req.body.userIdx),
        (e) => {
          if (e) {
            fs.promises.mkdir(
              path.resolve("uploads/crewprofile/", req.body.userIdx),
              { recursive: true }
            );
          }
          cb(null, "uploads/crewprofile/", req.body.userIdx);
        }
      );
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});
