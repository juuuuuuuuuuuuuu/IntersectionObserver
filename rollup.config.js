import browsersync from 'rollup-plugin-browsersync';
import html from 'rollup-plugin-generate-html-template';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
// import sourcemaps from 'rollup-plugin-sourcemaps';
// import cssimport from 'postcss-import';
// import autoprefixer from 'autoprefixer';
// import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    // bundle의 변경사항을 웹 브라우저에 반영
    browsersync({
      server: 'dist',
    }),
    html({
      template: 'index.html',
      target: 'dist/index.html',
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    // postcss({
    //   plugins: [cssimport(), autoprefixer()],
    // }),
  ],
};
