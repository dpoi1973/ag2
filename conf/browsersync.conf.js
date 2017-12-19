const conf = require('./gulp.conf');
const proxy = require('http-proxy-middleware');
const apiProxy = proxy('/api', {

  // target: 'http://192.168.0.72:4001',
  target: 'http://192.168.0.72:2377',
  proxyTable: {
    // '/remote': 'http://192.168.0.72:3001',
    // '/parameter': 'http://192.168.0.72:5000'
    '/remote': 'http://192.168.0.72:3001',
    '/printer': 'http://192.168.0.32:5030',
    '/uploader': 'http://192.168.0.55:8092'
  },
  // pathRewrite: {'^/api/remote': '/api', '^/api/parameter': '', '^/api': ''},
  pathRewrite: {'^/api/remote': '/api', '^/api/printer': '', '^/api/uploader': '', '^/api': ''},
  changeOrigin: true // for vhosted sites
});
module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: apiProxy
    },
    open: false
  };
};
