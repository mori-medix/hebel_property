// 私用するときは
// package.json を "start": "node ./server.js" にする。
import browserSync from 'browser-sync';

browserSync({
  proxy: 'localhost:8080',
  startPath: './',
  files: [
    './dist/**/*.css',
    './dist/**/*.js',
    './dist/**/*.html',
  ],
});
