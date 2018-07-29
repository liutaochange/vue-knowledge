module.exports = {
  extends: [
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module' //类型为module，因为代码使用了使用了ECMAScript模块
  },
  plugins: [
    'vue',
    "html",
    "standard",
    "promise"
  ],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    mocha: true
  },
  root: true,
  rules: {
    'no-console': 'error'
  }
}