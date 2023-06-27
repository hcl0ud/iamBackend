module.exports = {
  apps: [
    {
      name: "iamServer",
      script: "src/index.js",
      instances: 1,
      exec_mode: "cluster",
      watch: ".",
    },
  ],
};
