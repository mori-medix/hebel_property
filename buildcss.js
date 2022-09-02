import sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
// import cssnano from 'cssnano';
import fse from 'fs-extra';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { getBaseDir } from './base-dir.js';
const baseDir = getBaseDir('css',__dirname);

const pathArrey = [];
baseDir.forEach((value) => {
  pathArrey.push(value);
});

let map;
if ('map:true' === process.argv[2]) {
  map = true;
} else {
  map = false;
}

function mkOutdir(outputPath) {
  return outputPath
    .split('/')
    .filter((value, index) => {
      if (outputPath.split('/').length !== index + 1) {
        return value;
      }
    }).join('/');
}

function output(outputPath, write) {
  const processAll = function (func) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (func === 'processA') {
          fse.ensureDirSync(mkOutdir(outputPath));
          fs.writeFile(outputPath, write, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }

        if (func === 'processB') {
          fs.readFile(outputPath, (err, css) => {
            postcss([
              autoprefixer({
                grid: 'autoplace',
              }),
              // cssnano({
              //   preset: 'default',
              // }),
            ])
              // processOptions https://postcss.org/api/#processoptions
              .process(css, { from: outputPath, to: outputPath, map: false })
              // ResultOptions https://postcss.org/api/#resultoptions
              .then((result) => {
                fs.writeFile(outputPath, result.css, () => true);
              });
          });
        }
        resolve();
      }, 0);
    });
  };

  if (map) {
    const buildcss = async function () {
      await processAll('processA');
    };
    buildcss();
  } else {
    const buildcss = async function () {
      await processAll('processA');
      await processAll('processB');
    };
    buildcss();
  }
}

pathArrey.forEach((path) => {
  const data = sass.renderSync({
    file: path.inputPath,
    outFile: path.outputPath,
    sourceMap: map,
  });

  output(path.outputPath, data.css);
  if (map) {
    output(path.outputPath + '.map', data.map);
  }
});

//参考
// https://github.com/sass/dart-sass
// option は node-sass を参照
// https://github.com/sass/node-sass#user-content-examples
// postcss
// https://www.npmjs.com/package/postcss
// https://postcss.org/api/
// async awit
// https://qiita.com/_takeshi_24/items/1403727efb3fd86f0bcd

//使っていた postcss.config.js の記述
//
// const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
// module.exports = {
//     plugins: [
//         autoprefixer({
//             grid: 'autoplace'
//         }),
//         cssnano({
//             autoprefixer: false
//         })
//     ]
// };

// package.json の以前の記述
// "autoprefixer": "postcss -c postcss.config.js dist/hebel-rooms/feature/kanosakaemachidori/assets/css/ -b dist/hebel-rooms/feature/kanosakaemachidori/assets/css/ -d dist/hebel-rooms/feature/kanosakaemachidori/assets/css/",
// "change-css": "yarn build-css:nomap && yarn autoprefixer",
