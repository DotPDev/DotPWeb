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
    vm.selectedProduct = null;
    $scope.isCheckingOut = false;
    $scope.isManagingCart = false;
    $scope.isItemSelected = false;
    $scope.handleProductClick = handleProductClick;
    $scope.closeProducts = closeProducts;
    $scope.getProductClass = getProductClass;
    vm.startCheckOut = startCheckOut;
    vm.closeCheckOut = closeCheckOut;
    vm.addToCart = addToCart;
    vm.openCart = openCart;
    vm.closeCart = closeCart;
    $scope.validationMessage = '';
    $scope.checkoutMessage = '';
    $scope.data = {};
    $scope.orderNumber = '';
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

    function getProductClass(i) {
      return 'product-' + i;
    }

    function handleProductClick(i, $event) {
      console.log($event.currentTarget.parentNode);
      if (!$scope.isItemSelected) {
        $event.currentTarget.className += ' selected-item';
        $scope.isItemSelected = true;
      }
    }

    function closeProducts(i, $event) {
      //HACK - shitty timeout hack
      setTimeout(function(){console.log("closing products");
      	console.log($event.currentTarget.parentNode.className);
      	$event.currentTarget.parentNode.className = 'product float-left ng-scope product-' + i;
      	console.log($event.currentTarget.parentNode.className);
      	$scope.isItemSelected = false;
      	$scope.$digest();
    	},50);

    }
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
      // {
      //   variant_id: 6584, //black tshirt
      //   name: 'DotP T-Shirt', //Display name
      //   retail_price: '19.99', //Retail price for packing slip
      //   quantity: 1,
      //   files: [
      //     {url: 'https://d1yg28hrivmbqm.cloudfront.net/files/083/0839977f59f96553d1fe47bce3d50b5a_preview.png'},
      //     {type: 'preview', url: 'https://d1yg28hrivmbqm.cloudfront.net/files/1f1/1f10966e40bd27388eeae9a5352d7fbf_preview.png'}
      //   ],
      //   sizes: [{size: "Small", variant_id: "6584"}, {size: "Medium", variant_id: "6585"}, {size: "Large", variant_id: "6586"}, {size: "X-Large", variant_id: "6587"}],
      //   chosen_size: "6584"
      // }
      {
        type: "clothing",
        	name: "Men's DotP Beefy-T",
        	retail_price: '19.99',
        	quantity: 1,
        	files: [
          	{url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-logo-shirt.png'},
          	{type: 'preview', url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-mens-shirt-black.png'}
        	],
        	sizes: [{size: "Small", variant_id: "5407"}, {size: "Medium", variant_id: "5408"}, {size: "Large", variant_id: "5409"}, {size: "XL", variant_id: "5410"}, {size: "2XL", variant_id: "5411"}, {size: "3XL", variant_id: "5412"}, {size: "4XL", variant_id: "5413"}, {size: "5XL", variant_id: "5414"}, {size: "6XL", variant_id: "5415"}],
        	chosen_size: {size: "Small", variant_id: "5407"}
      },{
        type: "clothing",
        	name: "Ladies' Deep V DotP T-Shirt",
        	retail_price: '19.99',
        	quantity: 1,
        	files: [
          	{url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-logo-ladies-shirt.png'},
          	{type: 'preview', url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-ladies-shirt-black.png'}
        	],
        sizes: [{size: "Small", variant_id: "6243"}, {size: "Medium", variant_id: "6244"}, {size: "Large", variant_id: "6245"}, {size: "XL", variant_id: "6246"}],
        chosen_size: {size: "Small", variant_id: "6243"}
      },{
        type: "clothing",
        name: "E'rybody DotP Hoodie",
        retail_price: '39.99',
        quantity: 1,
        //TODO - get hoodie MOCKUPS
        files: [
          {url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-logo-hoodie.png'},
          {type: 'preview', url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-hoodie.png'}
        ],
        sizes: [{size: "Small", variant_id: "5530"}, {size: "Medium", variant_id: "5531"}, {size: "Large", variant_id: "5532"}, {size: "XL", variant_id: "5533"}, {size: "2XL", variant_id: "5534"}, {size: "3XL", variant_id: "5535"}, {size: "4XL", variant_id: "5536"}, {size: "5XL", variant_id: "5537"}],
      	// },{
      	//   type: "hat",
      	//   variant_id: "7854",
      	//   name: "DotP Baseball Cap",
      	//   retail_price: '30.00',
      	//   quantity: 1,
      	//   //TODO - get DotP Cap MOCKUPS
      	//   files: []
      }
      ,{
        type: "mug",
        name: "DotP Coffee Mug",
        retail_price: '19.99',
        quantity: 1,
        //TODO - get DotP Mug MOCKUPS
        files: [
          {url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-mug-11oz.png'},
          {type: 'preview', url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-mug-left-handle.png'}
            // {url: 'localhost:9000/images/dotp-mug-11oz.png'},
            // {type: 'preview', url: 'localhost:9000/images/dotp-mug-left-handle.png'}
        ],
        sizes: [{size: "11oz", variant_id: "1320", file: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-mug-11oz.png'}]
// {size: "15oz", variant_id: "4830", file: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-mug-15oz.png'}
      }
    ];

    //TODO - Cart Service - Add to cart
    function addToCart(product, i, $event) {
      $scope.validationMessage = '';

      var productJson = {};

      if (product.type === "hat") {
        productJson = {
          variant_id: product.variant_id,
          name: product.name,
          retail_price: product.retail_price,
          quantity: 1,
          files: product.files,
        };
      } else if (product.type === "mug") {
        productJson = {
          variant_id: product.chosenSize.variant_id,
          name: product.name,
          retail_price: product.retail_price,
          quantity: 1,
          files: [
            {url: product.chosenSize.file},
            {type: 'preview', url: 'https://staging-defenseofthepatience.herokuapp.com/images/dotp-mug-left-handle.png'}
          ]
        };
      } else {
        productJson = {
          variant_id: product.chosenSize.variant_id,
          size: product.chosenSize.size,
          name: product.name,
          retail_price: product.retail_price,
          quantity: 1,
          files: product.files,
        };
      }
      cart.addToCart(productJson);
      //TODO - Remove this after done with cart svc
      vm.cart.items = cart.getCartItems();
      vm.cart.price = cart.getTotalPrice();

      setTimeout(function() {
        $event.currentTarget.parentNode.parentNode.className = 'product float-left ng-scope product-' + i;
        $scope.isItemSelected = false;
        $scope.$digest();
      },50);
    }

    function removeFromCart(i) {
      cart.removeItem(vm.cart.items, i);
      vm.cart.items = cart.getCartItems();
      vm.cart.price = cart.getTotalPrice();
    }

    function renderButton() {
      var windowLoc = window.location.toString().toLowerCase(),
        environment = "sandbox";
      if (windowLoc === "https://defenseofthepatience.herokuapp.com/store" || windowLoc === "http://defenseofthepatience.herokuapp.com/store" || windowLoc.indexOf("defenseofthepatience.com/store") !== -1) {
        environment = "production";
      }
      paypal.Button.render({

        env: environment, // Optional: specify 'sandbox' environment

        payment: function() {
          // Set up the payment here, when the buyer clicks on the button

          //Send data

          return paypal.request.post('/api/paypal/create/', {data:createPrintfulOrder()}).then(function(res) {
            $scope.printfulId = res.printfulId;
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
            payerId: data.payerID,
            printfulId: $scope.printfulId
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
      vm.cart.items = cart.getCartItems();
      vm.cart.price = cart.getTotalPrice();
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

    // function handleScrollBars() {
    //   var scrollable = document.getElementById("store-wrapper");
    //   Ps.initialize(scrollable);
    // }

    // handleScrollBars();
  });
