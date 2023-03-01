export function getBaseDir(type,__dirname) {
  let baseDir;
  if(type === 'img'){
    baseDir = [
      {
        inputPath: `./src/assets/img/`,
        outputPath: `./dist/assets/img/`,
      },
    ];
  } else if(type === 'css'){
    baseDir = [
      {
        inputPath: `${__dirname}/src/pages/hebel-rooms/search/list_a/index.scss`,
        outputPath: `${__dirname}/dist/hebel-rooms/common_v2/css/search/style.css`,
      },
      {
        inputPath: `${__dirname}/src/pages/hebel-rooms/lightbox08/index.scss`,
        outputPath: `${__dirname}/dist/hebel-rooms/lightbox08/css/style.css`,
      },
      {
        inputPath: `${__dirname}/src/pages/hebel-rooms/features/hebelmaison/style.scss`,
        outputPath: `${__dirname}/dist/hebel-rooms/common_v2/css/features/hebelmaison/style.css`,
      },
      // {
      //   inputPath: `${__dirname}/src/pages/hebel-rooms/features/hebelmaison/swiper.scss`,
      //   outputPath: `${__dirname}/dist/hebel-rooms/common_v2/css/features/hebelmaison/swiper.css`,
      // },
    ];
  }
  return baseDir;
}