var express = require('express')
var router = express.Router()
var request = require('request')
var paypal = require('paypal-rest-sdk')
var bodyParser = require("body-parser")

const TOKEN = "access_token$production$y26bhr2tmk88zrtx$18bab4b85418a871470a1cc18c31af25"

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AeLvUGTnJOgmOHM_yTXYoKAz7zqbn9Rn08J1BQKUDVnIQKLgncdi-2nKwQ6r4uokHnjW0gAs96ybw9XA',
  'client_secret': 'EJivT9kSujVFY6IswykrNb8cwMCObI8ATZK5ToJB45TkjKlxlnKRA-37XfmjA5UvtQ6Exq495SNE4u7r'
})

function buildPaymentObject () {
    // Build PayPal payment request

    var payReq = JSON.stringify({
      intent:'sale',
      payer:{
        payment_method:'paypal'
    },
    redirect_urls:{
        return_url:'http://localhost:3000/process',
        cancel_url:'http://localhost:3000/cancel'
    },
    transactions:[{
        amount:{
          total:'10',
          currency:'USD'
      },
      description:'This is the payment transaction description.'
  }]
});
    return payReq;
}

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


    