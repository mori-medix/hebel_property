/* eslint-disable @typescript-eslint/no-var-requires */
//開発用
import { merge } from 'webpack-merge';
import { common } from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'source-map',
});