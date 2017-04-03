'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LadderCtrl
 * @description
 * # LadderCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('StoreCtrl',  function ($scope, firebaseSvc, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    //vm.renderButton = renderButton;
    vm.cart = {};
    vm.cart.order = {};
    vm.cart.items = [];
    vm.isCheckingOut = false;
    vm.startCheckOut = startCheckOut;
    vm.addToCart = addToCart;
    $scope.address = {
      name: '',
      place: '',
      components: {
        placeId: '',
        streetNumber: '',
        street: '',
        city: '',
        state: '',
        countryCode: '',
        country: '',
        postCode: '',
        district: ''
      }
    };
    // jscs:disable

    function startCheckOut() {
      vm.isCheckingOut = true;
      renderButton();
    }

    //TODO - move to data creation services
    function createPrintfulOrder(){
      return JSON.stringify({
          recipient:  {
              name: $scope.buyer,
              address1: $scope.address.components.streetNumber + ' ' + $scope.address.components.street,
              city: $scope.address.components.city,
              state_code: $scope.address.components.state,
              country_code: $scope.address.components.countryCode,
              zip: $scope.address.components.postCode
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
      });
    }

    // jscs:enable

    vm.fakeStoreData = [
      {
        variant_id: 6584, //black tshirt
        name: 'DotP T-Shirt', //Display name
        retail_price: '19.99', //Retail price for packing slip
        quantity: 1,
        files: [
          {url: 'https://d1yg28hrivmbqm.cloudfront.net/files/083/0839977f59f96553d1fe47bce3d50b5a_preview.png'},
          {type: 'preview', url: 'https://d1yg28hrivmbqm.cloudfront.net/files/1f1/1f10966e40bd27388eeae9a5352d7fbf_preview.png'}
        ],
        sizes: ["Small", "Medium", "Large", "X-Large"]
      }
    ];

    function addToCart(product) {
      console.log($scope.chosenSize);
      console.log(product);
    }

    function renderButton() {
      paypal.Button.render({

            env: 'sandbox', // Optional: specify 'sandbox' environment

            payment: function() {
                // Set up the payment here, when the buyer clicks on the button

                //Send data

                  return paypal.request.post('/api/paypal/create/', {data:createPrintfulOrder()}).then(function(res) {
                    res.payment = res.id;
                    return res.id;
                });

                // var env    = this.props.env;
                // var client = this.props.client;

                // return paypal.rest.payment.create(env, client, {
                //     transactions: [
                //         {
                //             amount: { total: '1.00', currency: 'USD' }
                //         }
                //     ]
                // });
            },

            onAuthorize: function(data, actions) {
                // Execute the payment here, when the buyer approves the transaction
                console.log(data);
                console.log(actions);
                   return paypal.request.post('/api/paypal/execute/', {
                    payToken: data.paymentID,
                    payerId: data.payerID
                }).then(function (res) {

                    document.querySelector('#paypal-button').innerText = 'Payment Complete!';
                });
           }

        }, '#paypal-button');
    }
  });
