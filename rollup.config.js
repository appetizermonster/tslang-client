import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

export default {
  input: './src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  plugins: [typescript()]
};
