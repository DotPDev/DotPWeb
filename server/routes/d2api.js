  var express = require('express');
var router = express.Router();

  const Dota2Api = require('dota2-api');

  const da = Dota2Api.create('3A71A040E293AB48661350FDA2C7D06C');

  const options = {game_mode: 1};
  da.getMatchHistory(options).then((result) => {
      console.log(result);
  }, (errorResponseStatusText) => {
      console.log(errorResponseStatusText);
  });

  module.exports = router;