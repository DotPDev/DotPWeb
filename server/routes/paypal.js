const router = require('express').Router()
const bodyParser = require('body-parser')
const request = require('request')
const paypal = require('paypal-rest-sdk')

const printfulSvc = require('../services/printfulSvc')
const paypalObjectSvc = require('../services/paypalObjectSvc')

const TOKEN = "access_token$production$y26bhr2tmk88zrtx$18bab4b85418a871470a1cc18c31af25"

let experience_profile_id = 'XP-B8Q8-KRKB-ASVE-ZFQQ';

let PP_ID = 'AeLvUGTnJOgmOHM_yTXYoKAz7zqbn9Rn08J1BQKUDVnIQKLgncdi-2nKwQ6r4uokHnjW0gAs96ybw9XA'
let PP_SECRET = 'EJivT9kSujVFY6IswykrNb8cwMCObI8ATZK5ToJB45TkjKlxlnKRA-37XfmjA5UvtQ6Exq495SNE4u7r'
let PP_ENV = 'sandbox'

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

if (!experience_profile_id) {
  paypal.webProfile.create(paypalObjectSvc.buildPaymentProfile(), function (error, web_profile) {
    if (error) {
      console.log(error);
    } else {
      //Set the id of the created payment experience in payment json
      experience_profile_id = web_profile.id;
      console.log(experience_profile_id);
    }
  });
}

router.post('/create', function(req, res) {
  console.log(req.body)
    printfulSvc.createOrder(JSON.parse(req.body.data)).then((data, info) => {
      const order = paypalObjectSvc.buildPaymentObject(data)
      paypal.payment.create(order, function(error, payment) {
          if (error) {
            throw error;
          } else {

              res.send(payment);
          }
      });
    })



})

router.post('/execute', function(req, res) {
  const token = req.body.payToken, id = req.body.payerId

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
