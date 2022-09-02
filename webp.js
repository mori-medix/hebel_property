import webp from 'webp-converter';
import glob from 'glob';
import fse from 'fs-extra';
import { getBaseDir } from './base-dir.js';
const baseDir = getBaseDir('img');
const remove = process.argv[2].split(':')[1];

const extensionArrey = ['*.jpg', '*.png', '*.gif'];
const quality = 90;

baseDir.forEach((dir) => {
  if(remove === 'true'){
    fse.removeSync(dir.outputPath);
  }
  fse.ensureDirSync(dir.outputPath);
  extensionArrey.forEach(function (value) {
    const pattern = dir.inputPath + value;
    glob(pattern, function (err, files) {
      if (err) {
        console.log(err);
      }
      files.forEach(function (file) {
        const fileWebp = file.replace(new RegExp(dir.inputPath + '(.*)(jpg|png|gif)', 'g'), dir.outputPath + '$1webp');
        // eslint-disable-next-line no-undef
        const result = webp.cwebp(file, fileWebp, `-q ${quality}`);
        result.then((response) => {
          console.log(response);
        });
      });
    });
  });
});

// webp-converter
// https://www.npmjs.com/package/webp-converter
// https://github.com/scionoftech/webp-converter
// https://developers.google.com/speed/webp
// https://developers.google.com/speed/webp/docs/cwebp
// logging 解説（logging オプションはエラーがでたので削除した）
