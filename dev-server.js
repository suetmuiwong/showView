var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback')
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware')
const bundler = webpack(config);

// import browserSync from 'browser-sync';






// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
var proxy = [{
    path: '/api',
    target: 'http://localhost:3001',
    secure: false,
    changeOrigin: true
    //host: 'openapi.dvr163.com'
}];

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: proxy,
    stats: {
        colors: true
    },
});


// Run Browsersync and use middleware for Hot Module Replacement
// browserSync({
//     port: 8888,
//     ui: {
//       port: 8888
//     },
//     server: {
//       baseDir: 'src',
  
//       middleware: [
//         historyApiFallback(),
  
//         webpackDevMiddleware(bundler, {
//           // Dev middleware can't access config, so we provide publicPath
//           publicPath: config.output.publicPath,
  
//           // These settings suppress noisy webpack output so only errors are displayed to the console.
//           noInfo: false,
//           quiet: false,
//           stats: {
//             assets: false,
//             colors: true,
//             version: false,
//             hash: false,
//             timings: false,
//             chunks: false,
//             chunkModules: false
//           },
  
//           // for other settings see
//           // http://webpack.github.io/docs/webpack-dev-middleware.html
//         }),
  
//         // bundler should be the same as above
//         webpackHotMiddleware(bundler)
//       ]
//     },
  
//     // no need to watch '*.js' here, webpack will take care of it for us,
//     // including full page reloads if HMR won't work
//     files: [
//       'src/*.html'
//     ]
//   });








//将其他路由，全部返回index.html
// server.app.get('*', function (req, res) {
//     res.sendFile(__dirname + '/index.html')
// });

//把IP地址改成你自己的，不知道改什么就localhost
server.listen(8888);




