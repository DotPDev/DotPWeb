'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LadderCtrl
 * @description
 * # LadderCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('StoreCtrl', function ($scope, firebaseSvc, $http, cart) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log(cart.getCartItems());

    var vm = this;
    //vm.renderButton = renderButton;
    vm.cart = {};
    vm.cart.price = 0;
    vm.cart.items = [];
    vm.emptyCart = emptyCart;
    $scope.isCheckingOut = false;
    $scope.isManagingCart = false;
    vm.startCheckOut = startCheckOut;
    vm.closeCheckOut = closeCheckOut;
    vm.addToCart = addToCart;
    vm.openCart = openCart;
    vm.closeCart = closeCart;
    $scope.validationMessage = '';
    $scope.checkoutMessage = '';
    $scope.data = {};
    vm.removeFromCart = removeFromCart;
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
    // jscs:disable

    function startCheckOut() {
      var paypalButton = document.getElementById("paypal-button");
      while (paypalButton.firstChild) {
        paypalButton.removeChild(paypalButton.firstChild);
      }

      if (vm.cart.items.length) {
        $scope.isCheckingOut = true;
        renderButton();
      } else {
        $scope.validationMessage = " - No items in cart.";
      }
    }

    function closeCheckOut() {
      $scope.isCheckingOut = false;
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

          //TODO - Cart Service - Get Items
          items: cart.getCartItems()
      });
    }

    // jscs:enable

    function openCart() {
      $scope.isManagingCart = true;
      $scope.isCheckingOut = false;
    }

    function closeCart() {
      $scope.isManagingCart = false;
      $scope.isCheckingOut = false;
    }

    function emptyCart() {
      cart.emptyCart();
      vm.cart.items = cart.getCartItems();
      vm.cart.price = cart.getTotalPrice();
    }



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

    //TODO - Cart Service - Add to cart
    function addToCart(product) {
        $scope.validationMessage = '';
        cart.addToCart({
          variant_id: product.chosenSize.variant_id,
          size: product.chosenSize.size,
          name: product.name,
          retail_price: product.retail_price,
          quantity: 1,
          files: product.files,
        });
        //TODO - Remove this after done with cart svc
        vm.cart.items = cart.getCartItems();
        vm.cart.price = cart.getTotalPrice();
    }

    function removeFromCart(i) {
      cart.removeItem(vm.cart.items, i);
      vm.cart.items = cart.getCartItems();
      vm.cart.price = cart.getTotalPrice();
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
                    $scope.checkoutMessage = "Order Placed";
                });
           }

        }, '#paypal-button');
    }

    function resetCheckout() {
      vm.cart.items = [];
      cart.emptyCart();
      $scope.isCheckingOut = false;
      $scope.isManagingCart = false;
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
      $scope.buyer = '';
      $scope.$digest();
    }
  });
