import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// __dirname 参考 https://www.kindacode.com/article/node-js-using-__dirname-and-__filename-with-es-modules/

export const common = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    'detail/page':'./src/assets/ts/common_v2/detail/page.ts',
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: [
          {
            loader: 'ts-loader',
            //型チェックはIDEだけでおこなう
            //参考:https://mizchi.hatenablog.com/entry/2020/05/03/151022
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // .js を入れないと「intersection-observer」のpolyfillを読み込めなかった
  resolve: {
    extensions: ['.ts','.js'],
  },
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/hebel-rooms/common_v2/js/`,
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 本番環境で console.log を出力しない
          },
        },
        extractComments: false,// ライセンスを別ファイルにしない
      })
    ],
  },
};
