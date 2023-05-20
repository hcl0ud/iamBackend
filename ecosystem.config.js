module.exports = {
  apps: [
    {
      script: "nodemon ./src/index.js",
      watch: ".",
    },
    {
      script: "./service-worker/",
      watch: ["./service-worker"],
    },
  ],

  deploy: {
    production: {
      user: "iamServer",
      host: "iam",
      ref: "origin/master",
      repo: "https://github.com/hcl0ud/iamBackend.git",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
