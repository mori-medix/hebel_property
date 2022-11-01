module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  rules: {
    indentation: 2,
    'string-quotes': 'double',// ダブルクォーテーション
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-colon-newline-after': null,
    'no-descending-specificity': null,
    'value-list-comma-space-after':'always', // カンマの後に必ずスペース（value）
    'block-opening-brace-space-before': 'always',// {の前にスペースをいれる
    'declaration-colon-space-after': 'always',// コロンの後に必ずスペースを入れる
    'block-opening-brace-newline-after': 'always',// 「{」のあとは必ず改行
    'block-closing-brace-newline-before': 'always',// 「}」の前に必ず改行
    'selector-combinator-space-after': 'always',// 「+」や「>」のあとに必ずスペース
    'selector-combinator-space-before': 'always',// 「+」や「>」の前にも必ずスペース
    'selector-list-comma-space-after': 'always',// カンマの後に必ずスペース（class名）
    'selector-class-pattern': '^([-]?[a-z]*[^-][a-z0-9]*)(-[a-z0-9_]+)*$', //ケバブけースで最初のハイフンを許容
    'font-family-name-quotes': 'always-unless-keyword', // googlefont をそのまま貼ってもエラーが出ないように
    'scss/at-function-pattern': '^[A-Z]([A-Z0-9_]+[A-Z0-9]+)?$', // scss関数は大文字のスネークケースで
    'scss/at-mixin-pattern': '^[A-Z]+([A-Z0-9_]+[A-Z0-9]+)?$', // scss関数は大文字のスネークケースで
    'scss/dollar-variable-pattern': '^[A-Z]+([A-Z0-9_]+[A-Z0-9]+)?$', // scss変数は大文字のスネークケースで
    'value-keyword-case': ['lower', { ignoreProperties: ['$FONT_FAMILY_BASE'] }], // 変数のフォントファミリーの大文字を許容する。参考:https://github.com/stylelint/stylelint/issues/4622
    'function-name-case': [// lower でないと「calc」が小文字でエラーになる。scss の関数だけ大文字を許容する。
      'lower',
      {
        ignoreFunctions: ['/^[g#]({g)?\.[A-Z0-9_]*$/'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'else', 'for', 'each', 'include', 'mixin', 'content', 'forward', 'use', 'else', 'return'],
      },
    ],
    'keyframes-name-pattern':"anime-.+"// @keyframes の名前はアニメとつける
  },
};

// ルール参考
// https://yuw27b.hatenablog.com/entry/2016/02/22/225544
// module.exports を外せず、es6 import/export が使えなかったので、拡張子「cjs」にしている
// https://iwb.jp/css-stylelint-vscode-settings-rules/
// keyframes-name-pattern のルールはこちらを参考
