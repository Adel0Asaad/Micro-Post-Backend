require('ts-node').register({
  transpileOnly: true,
  require: ['tsconfig-paths/register'],
});

require('./src/index.ts');
