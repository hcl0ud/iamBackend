module.exports = {
  apps: [
    {
      name: "app",
      script: "nodemon ./src/index.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
