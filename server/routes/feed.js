var express = require('express');
var router = express.Router();
var httpProxy = require('http-proxy');
var dotpRssFeedUrl = 'http://defenseofthepatience.libsyn.com/rss';
var proxyOptions = {
    changeOrigin: true
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);


/* GET users listing. */
router.get('/', function(req, res, next) {
    apiProxy.web(req, res, {target: dotpRssFeedUrl});
});

module.exports = router;
