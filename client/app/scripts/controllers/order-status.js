'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:OrderStatusCtrl
 * @description
 * # OrderStatusCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('OrderStatusCtrl', function ($stateParams, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    vm.orderId = $stateParams.orderId
    vm.printfulStatus = "Retrieving status";
    vm.shippingStatus = "Pending";
    vm.shippingLink = null;

    function getOrderStatus(orderId) {
      console.log("Getting status");
      $http.get('/api/printful/orders/' + vm.orderId).then(function(response) {
        var order = response.data;
        console.log(response.data);
        vm.printfulStatus = order.status;
        if (order.shipments.length > 0){
          vm.shippingStatus = order.shipments[0].service + " - " + order.shipments[0].tracking_number;
          vm.shippingLink = order.shipments[0].tracking_url;
        }
      }).catch(function(error) {
        //TODO show UI error to user
        vm.printfulStatus = "Error Getting Status";
        vm.shippingStatus = "Error Getting Status"
        console.log(error);
      });
    }

    getOrderStatus(vm.orderId);

  });
