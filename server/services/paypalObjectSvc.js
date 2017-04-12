// { id: 2534833,
//   external_id: null,
//   status: 'draft',
//   shipping: 'USPS_FIRST',
//   created: 1490935739,
//   updated: 1490935739,
//   recipient:
//    { name: 'AD Deadman',
//      company: null,
//      address1: '1337 Epic St',
//      address2: null,
//      city: 'St. Louis',
//      state_code: 'MO',
//      state_name: 'Missouri',
//      country_code: 'US',
//      country_name: 'United States',
//      zip: '63125',
//      phone: null,
//      email: null },
//   items:
//    [ { id: 2267497,
//        external_id: null,
//        variant_id: 6584,
//        quantity: 1,
//        price: '17.25',
//        retail_price: '19.99',
//        name: 'DotP T-Shirt',
//        product: [Object],
//        files: [Object],
//        options: [],
//        sku: null } ],
//   costs:
//    { subtotal: '17.25',
//      discount: '0.00',
//      shipping: '3.05',
//      digitization: '0.00',
//      tax: '0.00',
//      total: '20.30' },
//   retail_costs:
//    { subtotal: '19.99',
//      discount: '0.00',
//      shipping: '3.05',
//      tax: '0.00',
//      total: '23.04' },
//   shipments: [],
//   gift: null,
//   packing_slip: null }
let experience_id = ''
if (process && process.env && process.env.PP_EXP_ID) {
// DotP Dev Experience -
  experience_id = 'XP-BKWF-4Z5R-MLZJ-QPE6'
}

function buildExecuteObject(payment) {
  var execute_payment_json = {
      "payer_id": payment.payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "30.00"
          }
      }],
      payee: {
        email: "DefenseOfThePatience@gmail.com",
        merchant_id: "7A7E6VLNB6GBC"
      },
      description: `Defense of the Patience Store Order - ${payment}`
  }
}

function buildPaymentProfile() {
  //Name needs to be unique so just generating a random one
  var profile_name = Math.random().toString(36).substring(7);

  var create_web_profile_json = {
      "name": profile_name,
      "presentation": {
          "brand_name": "Defense of the Patience",
          //"logo_image": "https://staging-defenseofthepatience.herokuapp.com/images/dotp-logo.svg",
          "locale_code": "US"
      },
      "input_fields": {
          "allow_note": true,
          "no_shipping": 1,
          "address_override": 1
      }
  };
  return create_web_profile_json;
}

function buildPaymentObject(printfulOrder) {
    // Build PayPal payment request

    const itemArray = printfulOrder.items.map(item => {
      return {
        name: item.name,
        sku: item.id,
        price: item.retail_price,
        currency: "USD",
        quantity: item.quantity
      }
    })

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
                "items": itemArray
            },
            "amount": {
                "currency": "USD",
                "total": printfulOrder.retail_costs.total,
                "details": {
                    "subtotal": printfulOrder.retail_costs.subtotal,
                    "shipping": printfulOrder.retail_costs.shipping,
                    "tax": printfulOrder.retail_costs.tax,
                    "shipping_discount": printfulOrder.retail_costs.discont
                }
            },
            "description": "Thank you for supporting Defense of the Patience!"
        }],

        // DotP Dev Experience -
        'experience_profile_id': experience_id

        //Deadman Dev Experience -
        //'experience_profile_id': 'XP-B8Q8-KRKB-ASVE-ZFQQ'
    });

    return payReq;
}

module.exports = {
  buildPaymentObject,
  buildPaymentProfile
}
