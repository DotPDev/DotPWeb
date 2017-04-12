'use strict';

/**
* @ngdoc service
* @name clientApp.cartSvc
* @description
* # utils
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('cart', function ($window) {
  var vm = this;
  vm.cart = {};
  vm.cart.items = [];
  vm.cart.price = 0.00;

  function updateTotalPrice() {
    vm.cart.price = 0;
    for (var i in vm.cart.items){
      vm.cart.price += parseFloat(vm.cart.items[i].retail_price);
    }
  }

  function addToCart(item) {
    vm.cart.items.push(item);
    updateTotalPrice();
  }

  function emptyCart() {
    vm.cart.items = [];
    updateTotalPrice();
  }

  function getCartItems() {
    return vm.cart.items;
  }

  function getTotalPrice() {
    return vm.cart.price;
  }


  function removeItem(array, i) {
    array.splice(i, 1);
    updateTotalPrice();
  }

  return {
  	addToCart: addToCart,
    emptyCart: emptyCart,
    getCartItems: getCartItems,
    updateTotalPrice: updateTotalPrice,
    getTotalPrice: getTotalPrice,
    removeItem: removeItem
  };
});
