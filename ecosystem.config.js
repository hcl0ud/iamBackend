module.exports = {
  apps: [
    {
      name: "iamServer",
      script: "nodemon src/index.js",
      instances: 1,
      exec_mode: "fork",
      watch: ".",
    },
  ],
};
