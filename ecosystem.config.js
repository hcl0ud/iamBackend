module.exports = {
  apps: [
    {
      name: "iamServer",
      script: "nodemon src/index.js",
      instances: 0,
      exec_mode: "folk",
      watch: ".",
    },
  ],
};
