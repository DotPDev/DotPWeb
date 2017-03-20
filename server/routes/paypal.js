var express = require('express')
var router = express.Router()
var request = require('request')

var bodyParser = require("body-parser");

const TOKEN = "access_token$production$y26bhr2tmk88zrtx$18bab4b85418a871470a1cc18c31af25"


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req)
    console.log(res)
    console.log(next)
  //doRequest()
})
router.post('/hats', function(req, res) {
    console.log(req.body)
})

module.exports = router;


    