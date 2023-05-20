module.exports = {
  apps: [
    {
      name: "iamServer",
      script: "src/index.js",
      instances: 0,
      exec_mode: "cluster",
      watch: ".",
    },
  ],
};
