const express = require('express')
const router = express.Router()
const request = require('request')
const bodyParser = require("body-parser")

const PrintfulClient = require('../printfulclient.js')

const devDataSvc = require('../services/devDataSvc')

let KEY = "cbjsvbwl-3vya-bqq8:3hve-4mjkonkv4acw"

if (process && process.env && process.env.PRINTFUL_KEY) {
  console.log("setting printful key")
  KEY = process.env.PRINTFUL_KEY
}
var ok_callback = function(data, info){
    console.log('SUCCESS');
    console.log(data);
    //If response includes paging information, show total number available
    if(info.total_items){
        console.log('Total items available: '+info.total_items)
    }
}

/**
 * Callback for failure
 * data - error message
 * info - additional data about the request
 */
var error_callback = function(message, info){
    console.log('ERROR ' + message);
    //Dump raw response
    console.log(info.response_raw);
}

///Construct client
var pf = new PrintfulClient(KEY);

//doRequest()


function doRequest() {

    //Get information about the store
    pf.get('store').success(ok_callback).error(error_callback)


}

function createOrder(orderInfo) {
  return new Promise(function (fulfill, reject){
    let isPriceSafe = true
      // if (!orderInfo) {
      //     orderInfo = devDataSvc.printfulOrder
      // }
    if (orderInfo && orderInfo.items) {
      for (let item of orderInfo.items) {
        // if (item.name.toLowerCase().indexOf('hoodie') !== -1 && item.retail_price !== '35.00') {
        //   isPriceSafe = false;
        // } else if (item.name.toLowerCase().indexOf('hoodie') === -1 && item.retail_price !== '30.00') {
        //   isPriceSafe = false;
        // }
      }
    }

    if (isPriceSafe) {
      pf.post('orders', orderInfo)
        .success(function(data, info) {
          fulfill(data)
        }).error(function(err) {

          reject(err)
        })
    } else {
      let error = "I think we know why this was rejected."
      reject(error)
    }
  })


}

function confirmOrder(id) {
  //Confirm order with ID 12345 (Replace with your order's ID)
  console.log(id);
      pf.post('orders/' + id + '/confirm').success((data, info) => {}).error((err) => {})
}

function getOrder(orderId) {
  return new Promise((fulfill, reject) => {

        //Select order with ID 12345 (Replace with your order's ID)
        pf.get('orders/' + orderId).success((data, info) => {fulfill(data)}).error((err) => {reject(err)})
  })
}
    //Get product list
    //pf.get('products').success(ok_callback).error(error_callback);

    //Get variants for product 10
    //pf.get('products/10').success(ok_callback).error(error_callback);

    //Get information about Variant 1007
    //pf.get('products/variant/1007').success(ok_callback).error(error_callback);

    //Select 10 latest orders and get the total number of orders
    //pf.get('orders',{limit: 10}).success(ok_callback).error(error_callback);

    //Select order with ID 12345 (Replace with your order's ID)
    //pf.get('orders/12345').success(ok_callback).error(error_callback);

    //Select order with External ID 9900999 (Replace with your order's External ID)
    //pf.get('orders/@9900999').success(ok_callback).error(error_callback);

    //Confirm order with ID 12345 (Replace with your order's ID)
    //pf.post('orders/12345/confirm').success(ok_callback).error(error_callback);

    //Cancel order with ID 12345 (Replace with your order's ID)
    //pf.delete('orders/23479').success(ok_callback).error(error_callback);

    //Create an order
/*
    pf.post('orders',
        {
            recipient:  {
                name: 'John Doe',
                address1: '19749 Dearborn St',
                city: 'Chatsworth',
                state_code: 'CA',
                country_code: 'US',
                zip: '91311'
            },
            items: [
                {
                    variant_id: 1, //Small poster
                    name: 'Niagara Falls poster', //Display name
                    retail_price: '19.99', //Retail price for packing slip
                    quantity: 1,
                    files: [
                        {url: 'http://example.com/files/posters/poster_1.jpg'}
                    ]
                },
                {
                   variant_id: 1118,
                   quantity: 2,
                   name: 'Grand Canyon T-Shirt', //Display name
                   retail_price: '29.99', //Retail price for packing slip
                   files: [
                        {url: 'http://example.com/files/tshirts/shirt_front.ai'}, //Front print
                        {type: 'back', url: 'http://example.com/files/tshirts/shirt_back.ai'}, //Back print
                        {type: 'preview', url: 'http://example.com/files/tshirts/shirt_mockup.jpg'} //Mockup image
                   ],
                   options: [ //Additional options
                        {id: 'remove_labels', value: true}
                   ]
                }
            ]
         }
    ).success(ok_callback).error(error_callback);
*/

    //Create an order and confirm immediately
/*
    pf.post('orders',
        {
            recipient:  {
                name: 'John Doe',
                address1: '19749 Dearborn St',
                city: 'Chatsworth',
                state_code: 'CA',
                country_code: 'US',
                zip: '91311'
            },
            items: [
                {
                    variant_id: 1, //Small poster
                    name: 'Niagara Falls poster', //Display name
                    retail_price: '19.99', //Retail price for packing slip
                    quantity: 1,
                    files: [
                        {url: 'http://example.com/files/posters/poster_1.jpg'}
                    ]
                }
            ]
        },
        {confirm: 1}
    ).success(ok_callback).error(error_callback);
*/

    //Calculate shipping rates for an order
/*
    pf.post('shipping/rates',{
        recipient: {
            country_code: 'US',
            state_code: 'CA'
        },
        items: [
           {variant_id: 1,  quantity: 1}, //Small poster
           {variant_id: 1118, quantity: 2} //Alternative T-Shirt
        ]
    }).success(ok_callback).error(error_callback);
*/

//const storeItems = [
  // {
  //   name: 'DotP T-Shirt', //Display name
  //   retail_price: '19.99', //Retail price for packing slip
  //   quantity: 1,
  //   files: [
  //     {url: 'https://d1yg28hrivmbqm.cloudfront.net/files/083/0839977f59f96553d1fe47bce3d50b5a_preview.png'},
  //     {type: 'preview', url: 'https://d1yg28hrivmbqm.cloudfront.net/files/1f1/1f10966e40bd27388eeae9a5352d7fbf_preview.png'}
  //   ],
  //   sizes: [{size: "Small", variant_id: "6584"}, {size: "Medium", variant_id: "6585"}, {size: "Large", variant_id: "6586"}, {size: "X-Large", variant_id: "6587"}],
  //   chosen_size: "6584"
  // },
  // {
  //   type: "clothing",
  //   name: "Men's DotP Beefy-T",
  //   retail_price: '30.00',
  //   quantity: 1,
  //   //TODO - GET Beefy-T MOCKUPS
  //   files: [],
  //   sizes: [{size: "Small", variant_id: "5407"}, {size: "Medium", variant_id: "5408"}, {size: "Large", variant_id: "5409"}, {size: "XL", variant_id: "5410"}, {size: "2XL", variant_id: "5411"}, {size: "3XL", variant_id: "5412"}, {size: "4XL", variant_id: "5413"}, {size: "5XL", variant_id: "5414"}, {size: "6XL", variant_id: "5415"}],
  //   chosen_size: {size: "Small", variant_id: "5407"}
  // },{
  //   type: "clothing",
  //   name: "Ladies' Deep V DotP T-Shirt",
  //   retail_price: '30.00'
  //   quantity: 1,
  //   //TODO - get Deep V MOCKUPS
  //   files: [],
  //   sizes: [{size: "Small", variant_id: "6243"}, {size: "Medium", variant_id: "6244"}, {size: "Large", variant_id: "6245"}, {size: "XL", variant_id: "6246"}],
  //   chosen_size: {size: "Small", variant_id: "6243"}
  // },{
  //   type: "clothing",
  //   name: "E'rybody DotP Hoodie",
  //   retail_price: '35.00',
  //   quantity: 1,
  //   //TODO - get hoodie MOCKUPS
  //   files: [],
  //   sizes: [{size: "Small", variant_id: "5530"}, {size: "Medium", variant_id: "5531"}, {size: "Large", variant_id: "5532"}, {size: "XL", variant_id: "5533"}, {size: "2XL", variant_id: "5534"}, {size: "3XL", variant_id: "5535"}, {size: "4XL", variant_id: "5536"}, {size: "5XL", variant_id: "5537"}],
  // },{
  //   type: "hat",
  //   variant_id: "7854",
  //   name: "DotP Baseball Cap",
  //   retail_price: '30.00',
  //   quantity: 1,
  //   //TODO - get DotP Cap MOCKUPS
  //   files: []
  // },{
  //   type: "Mug",
  //   name: "DotP Coffee Mug",
  //   retail_price: '15.00',
  //   quantity: 1,
  //   //TODO - get DotP Mug MOCKUPS
  //   files: [],
  //   sizes: [{size: "11oz", variant_id: "1320"}, {size: "15oz", variant_id: "4830"}]
  // }
//]


module.exports = {
  createOrder,
  confirmOrder,
  getOrder
}
