/*
Note: 
1. You do not need to import this file anywhere. It is automatically registered when you start the development server.

2. This file only supports Node's JavaScript syntax. Be sure to only use supported language features (i.e. no support for Flow, ES Modules, etc).

3. Passing the path to the proxy function allows you to use globbing and/or pattern matching on the path, which is more flexible than the express route matching.
*/

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // path: This will match paths starting with /api
    createProxyMiddleware({ // proxy
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};