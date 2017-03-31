const router = require('express').Router()
const bodyParser = require('body-parser')
const request = require('request')
const paypal = require('paypal-rest-sdk')

const printful = require('../services/printfulSvc.js')

const TOKEN = "access_token$production$y26bhr2tmk88zrtx$18bab4b85418a871470a1cc18c31af25"

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeLvUGTnJOgmOHM_yTXYoKAz7zqbn9Rn08J1BQKUDVnIQKLgncdi-2nKwQ6r4uokHnjW0gAs96ybw9XA',
    'client_secret': 'EJivT9kSujVFY6IswykrNb8cwMCObI8ATZK5ToJB45TkjKlxlnKRA-37XfmjA5UvtQ6Exq495SNE4u7r'
})

function buildPaymentObject(items) {
    // Build PayPal payment request
    var itemArray = [];
    var total = "30.00";
    if (!items) {
        items = [{
            "name": "DotP Shirt",
            "sku": "1039",
            "price": "28.00",
            "currency": "USD",
            "quantity": 1
        }];
    }

    var payReq = JSON.stringify({
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:9000/store',
            cancel_url: 'http://localhost:9000/store'
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": total,
                "details": {
                    "subtotal": "28.00",
                    "shipping": "1.00",
                    "tax": "2.00",
                    "shipping_discount": "-1.00"
                }
            },
            "description": "This is the payment description."
        }]
    });

    return payReq;
}

router.post('/create', function(req, res) {
    printful.createOrder()

    paypal.payment.create(buildPaymentObject(), function(error, payment) {
        if (error) {
            console.log(error);
            throw error;
        } else {

            res.send(payment);
        }
    });

})

router.post('/execute', function(req, res) {
  const token = req.body.payToken, id = req.body.payerId

    var execute_payment_json = {
        "payer_id": id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "30.00"
            }
        }]
    };


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
