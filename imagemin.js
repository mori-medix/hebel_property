import imagemin from 'imagemin-keep-folder';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import fse from 'fs-extra';
import { getBaseDir } from './base-dir.js';
const remove = process.argv[2].split(':')[1];
const baseDir = getBaseDir('img');

// 全て一括で行うとき
// const inputPath = 'src/assets/img/**/';
// const outputPath = '../../dist/assets/img/';// 起点はsrcのimgフォルダと同じ階層のようだ

// directory指定
const outputPath = `../../dist/assets/img/`;

baseDir.forEach((dir) => {
  if(remove === 'true'){
    fse.removeSync(dir.outputPath);
  }
imagemin([`${dir.inputPath}*.{jpg,png,gif,svg,webp}`], {
  plugins: [
    imageminMozjpeg({ quality: 95 }),
    imageminPngquant({ quality: [0.65, 0.8] }),// qualityの範囲
    imageminGifsicle(),
    imageminSvgo({
      plugins:[
        {
          name: 'removeViewBox',
          active: false 
        }
      ]
    })
  ],
  replaceOutputDir: output => {
    return output.replace(/img\//, outputPath);
  }
}).then(() => {
  console.log('Images optimized');
});
});

// webp を設定するなら
// http://tsudoi.org/weblog/6197/