'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LadderCtrl
 * @description
 * # LadderCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('StoreCtrl',  ['google.places', function (firebaseSvc, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.cart = {};
    vm.cart.order = {};
    vm.postOrder = postOrder;
    // jscs:disable
    vm.cart.order = {
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
    };
    // jscs:enable
    function postOrder() {
      return $http.post('/api/printful/', vm.cart.order).then(function(response) {
          //TODO show a message indicating that we're getting data again.
          if (response.message && response.message === 'service not loaded') {

          }
      }).catch(function(error) {
          //TODO show UI error to user
          console.log(error);
      });
    }

    vm.fakeStoreData = [
      {
        name: "DotP T-Shirt",
        image: "../images/Troll-T.jpg",
        price: 30.00,
        sizes: ["Small", "Medium", "Large", "X-Large"]
      },
      {
        name: "DotP Long Sleeve T-Shirt",
        image: "../images/Troll-T.jpg",
        price: 32.00,
        sizes: ["Small", "Medium", "Large", "X-Large"]
      },
      {
        name: "DotP Hoodie",
        image: "../images/Troll-T.jpg",
        price: 35.00,
        sizes: ["Small", "Medium", "Large", "X-Large"]
      },
      {
        name: "DotP Dress Shoes",
        image: "../images/Troll-T.jpg",
        price: 55.00,
        sizes: ["8", "9", "10", "11", "12"]
      }
    ];
  }]);
