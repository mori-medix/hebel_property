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
        inputPath: `${__dirname}/src/pages/hebel-rooms/search/detail/index.scss`,
        outputPath: `${__dirname}/dist/hebel-rooms/css/detail/style.css`,
      },
    ];
  }
  return baseDir;
}