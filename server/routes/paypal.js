const router = require('express').Router()
const bodyParser = require('body-parser')
const request = require('request')
const paypal = require('paypal-rest-sdk')

const printfulSvc = require('../services/printfulSvc')
const paypalObjectSvc = require('../services/paypalObjectSvc')

const TOKEN = "access_token$production$y26bhr2tmk88zrtx$18bab4b85418a871470a1cc18c31af25"

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeLvUGTnJOgmOHM_yTXYoKAz7zqbn9Rn08J1BQKUDVnIQKLgncdi-2nKwQ6r4uokHnjW0gAs96ybw9XA',
    'client_secret': 'EJivT9kSujVFY6IswykrNb8cwMCObI8ATZK5ToJB45TkjKlxlnKRA-37XfmjA5UvtQ6Exq495SNE4u7r'
})

router.post('/create', function(req, res) {
    printfulSvc.createOrder().then((data, info) => {
      const order = paypalObjectSvc.buildPaymentObject(data)
      console.log(order)
      paypal.payment.create(order, function(error, payment) {
          console.log(error)
          console.log(payment)
          if (error) {
            console.log("EEEERRRRRRRRROOOOOOOOOOOOOO)o0o0oR")
            console.log(error);
            throw error;
          } else {

              res.send(payment);
          }
      });
    })



})

router.post('/execute', function(req, res) {
  const token = req.body.payToken, id = req.body.payerId
console.log(req.body)
    var execute_payment_json = {
        "payer_id": id
    }


    paypal.payment.execute(token, execute_payment_json, function(error, payment) {
        if (error) {
            console.log("error.response");
            throw error;
        } else {
            console.log("Get Payment Response");
            res.send(payment);
        }
    });

})


module.exports = router;
