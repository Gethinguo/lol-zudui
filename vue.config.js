// vue.config.js文件中的配置
const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production'
    ? './'
    : '/'
module.exports = {
    publicPath: BASE_URL,
    outputDir: 'build',
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    // lintOnSave: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                // 要引入的全局的样式，不写的话就直接空数组
                // path.resolve(__dirname, './src/styles/*.less')
            ]
        }
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false
}