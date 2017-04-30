const router = require('express').Router()
const bodyParser = require('body-parser')
const request = require('request')
const paypal = require('paypal-rest-sdk')

const printfulSvc = require('../services/printfulSvc')
const paypalObjectSvc = require('../services/paypalObjectSvc')

const TOKEN = "access_token$production$y26bhr2tmk88zrtx$18bab4b85418a871470a1cc18c31af25"

let experience_profile_id = 'XP-BKWF-4Z5R-MLZJ-QPE6';

let PP_ID = 'AeLvUGTnJOgmOHM_yTXYoKAz7zqbn9Rn08J1BQKUDVnIQKLgncdi-2nKwQ6r4uokHnjW0gAs96ybw9XA'
let PP_SECRET = 'EJivT9kSujVFY6IswykrNb8cwMCObI8ATZK5ToJB45TkjKlxlnKRA-37XfmjA5UvtQ6Exq495SNE4u7r'
let PP_ENV = 'sandbox'

console.log("trying to set paypal keys")
if (process.env && process.env.PP_ID && process.env.PP_SECRET && process.env.PP_ENV) {
  console.log("setting paypal keys")
  PP_ID = process.env.PP_ID
  PP_SECRET = process.env.PP_SECRET
  PP_ENV = process.env.PP_ENV
}

paypal.configure({
    'mode': PP_ENV, //sandbox or live
    'client_id': PP_ID,
    'client_secret': PP_SECRET
})

// if (!experience_profile_id) {
//   paypal.webProfile.create(paypalObjectSvc.buildPaymentProfile(), function (error, web_profile) {
//     if (error) {
//       console.log(error);
//     } else {
//       //Set the id of the created payment experience in payment json
//       experience_profile_id = web_profile.id;
//       console.log(experience_profile_id);
//     }
//   });
// }

router.post('/create', function(req, res) {

    printfulSvc.createOrder(JSON.parse(req.body.data)).then((data, info) => {

      const order = paypalObjectSvc.buildPaymentObject(data)
      paypal.payment.create(order, function(error, payment) {
          if (error) {
            console.log(error)
            throw error;
          } else {
              payment.printfulId = data.id;
              res.send(payment);
          }
      });
    })



})

router.post('/execute', function(req, res) {
  const token = req.body.payToken, id = req.body.payerId,
    printfulId = req.body.printfulId

    var execute_payment_json = {
        "payer_id": id
    }


    paypal.payment.execute(token, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Get Payment Response");
            if (PP_ENV === "live") {
              //commit to printful
             printfulSvc.confirmOrder(printfulId);
            }
            res.send(payment);
        }
    });

})


module.exports = router;
