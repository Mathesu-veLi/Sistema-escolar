const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-rest-d4ob.onrender.com',
      changeOrigin: true,
    }),
  );
};
