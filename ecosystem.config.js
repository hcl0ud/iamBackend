module.exports = {
  apps: [
    {
      name: "app",
      script: "nodemon ./src/index.js",
      instances: 1,
      exec_mode: "cluster",
      watch: ".",
    },
  ],
};
