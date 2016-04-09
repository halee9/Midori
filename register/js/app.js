'use strict';
/*
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);
*/

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
	'ngRoute',
	'firebase',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers',
	'myApp.newCashierCtrl',
	'ui.sortable',
	'ui.bootstrap'
])

.run(function(){
	FastClick.attach(document.body);
})

.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		});
	$routeProvider
		.when('/cashier', {
			templateUrl: 'partials/cashier.html',
			controller: 'CashierCtrl'
		});
	$routeProvider
		.when('/newCashier', {
			templateUrl: 'partials/newCashier.html',
			controller: 'NewCashierCtrl'
		});
	$routeProvider
		.when('/customer', {
			templateUrl: 'partials/customer.html',
			controller: 'CustomerCtrl'
		});
	$routeProvider
		.when('/settlement', {
			templateUrl: 'partials/settlement.html',
			controller: 'SettlementCtrl'
		});
	$routeProvider
		.when('/timesheet', {
			templateUrl: 'partials/timesheet.html',
			controller: 'TimesheetCtrl'
		});
	$routeProvider
		.when('/payrolls', {
			templateUrl: 'partials/payrolls.html',
			controller: 'PayrollsCtrl'
		});
	$routeProvider
		.when('/printing', {
			templateUrl: 'partials/printing.html',
			controller: 'PrintingCtrl'
		});
	$routeProvider
		.when('/receiptPrinting', {
			templateUrl: 'partials/newOrderTicket.html',
			controller: 'ReceiptPrintingCtrl'
		});
	$routeProvider
		.when('/timesheet/new', {
			templateUrl: 'partials/newTimesheet.html',
			controller: 'NewTimesheetCtrl'
		});
	$routeProvider
		.when('/edit/:id', {
			templateUrl: 'partials/cashier.html',
			controller: 'CashierCtrl'
		});
	$routeProvider
		.when('/payment', {
			templateUrl: 'partials/payment.html',
			controller: 'PaymentCtrl'
		});
	$routeProvider
		.when('/payment/:id', {
			templateUrl: 'partials/payment.html',
			controller: 'PaymentCtrl'
		});
	$routeProvider
		.when('/kitchen', {
			templateUrl: 'partials/kitchen.html',
			controller: 'KitchenCtrl'
		});
	$routeProvider
		.when('/kitchenNew', {
			templateUrl: 'partials/kitchenNew.html',
			controller: 'KitchenCtrl'
		});
	$routeProvider
		.when('/list', {
			templateUrl: 'partials/list.html',
			controller: 'KitchenCtrl'
		});
	$routeProvider
		.when('/modifyMenu', {
			templateUrl: 'partials/modifyMenu.html',
			controller: 'ModifyMenuCtrl'
		});
	$routeProvider
		.otherwise({
			redirectTo: '/'
		});
}]);


