module.exports = {
    apps: [
      {
        name: 'backend-app',
        script: './server/index.js',
        watch: false,
        force: true,
        env: {
          PORT: 3001,
          NODE_ENV: 'production',
        },
      },
    ],
  };