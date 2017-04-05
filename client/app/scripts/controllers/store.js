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
    $scope.isCheckingOut = false;
    vm.startCheckOut = startCheckOut;
    vm.addToCart = addToCart;
    $scope.validationMessage = '';
    $scope.checkoutMessage = '';
    $scope.data = {};
    $scope.data.address = {
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
    $scope.data.chosenSize = '';
    // jscs:disable

    function startCheckOut() {
      if (vm.cart.items.length) {
        $scope.isCheckingOut = true;
        renderButton();
      } else {
        $scope.validationMessage = " - No items in cart.";
      }
    }

    //TODO - move to data creation services
    function createPrintfulOrder(){
      return JSON.stringify({
          recipient:  {
              name: $scope.buyer,
              address1: $scope.data.address.components.streetNumber + ' ' + $scope.data.address.components.street,
              city: $scope.data.address.components.city,
              state_code: $scope.data.address.components.state,
              country_code: $scope.data.address.components.countryCode,
              zip: $scope.data.address.components.postCode
          },
          items: vm.cart.items
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
        sizes: [{size: "Small", variant_id: "6584"}, {size: "Medium", variant_id: "6585"}, {size: "Large", variant_id: "6586"}, {size: "X-Large", variant_id: "6587"}],
        chosen_size: "6584"
      }
    ];

    function addToCart(product) {
      console.log(product);
        $scope.validationMessage = '';
        vm.cart.items.push({
          variant_id: product.chosenSize,
          name: product.name,
          retail_price: product.retail_price,
          quantity: 1,
          files: product.files,
        });
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
                    resetCheckout();
                    document.querySelector('#paypal-button').innerText = 'Payment Complete!';
                    checkoutMessage = "Order Placed"
                });
           }

        }, '#paypal-button');
    }

    function resetCheckout() {
      vm.cart.items = [];
      $scope.isCheckingOut = false;
      $scope.data.address = {
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
      $scope.buyer = ''
      $scope.$digest();
    }
  });
