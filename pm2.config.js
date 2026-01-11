module.exports = {
  apps: [
    {
      name: 'pharma-serve',
      script: 'src/index.ts',
      interpreter: 'npx',
      args: 'ts-node -r tsconfig-paths/register',
      watch: ['src'],
      ignore_watch: ['node_modules', 'dist'],
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
