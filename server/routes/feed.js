var express = require('express');
var router = express.Router();
var FeedParser = require('feedparser');
var request = require('request');

var episodes = [];
var rssCache = {};

//we update the main rss feed cache every 10 minutes
var interval = setInterval(function() {
    fetch();
}, 600000);
fetch();

function fetch() {
    var req = request('http://defenseofthepatience.libsyn.com/rss');
    var feedparser = new FeedParser();

    req.on('error', function (error) {
        //TODO do some logging here - google analytics
    });

    req.on('response', function (res) {
      var stream = this; // `this` is `req`, which is a stream

      if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
      }
      else {
        //emptying the cache
        episodes = [];
        res.pipe(feedparser);
      }
    });

    feedparser.on('error', function (error) {
      //TODO do some logging here - google analytics
    });

    feedparser.on('readable', function () {
      // This is where the action is!
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;
      while (item = this.read()) {
          var x = item;
          if (x) {
              episodes.push(x);
          }
      }
      rssCache = {
          meta: meta,
          episodes: episodes
      };
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    //return the current cache
    if (rssCache.episodes) {
        res.json( rssCache );
    } else {
        res.json( { message: 'service not loaded' } );
    }
});

module.exports = router;
