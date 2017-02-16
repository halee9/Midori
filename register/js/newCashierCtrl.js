'use strict';

/* Controllers */

angular.module('myApp.newCashierCtrl', [])

.controller('NewCashierCtrl', ['$scope', '$routeParams', '$filter', '$location', 'TabGroups', 'Menus', 'Orders', 'Order', 'Icons', 'Util', 'Types', '$modal', '$interval', 'FirstNames', 'OrderId', '$http', 'CustomerDisplay', 'Receipt', '$window',
	function($scope, $routeParams, $filter, $location, TabGroups, Menus, Orders, Order, Icons, Util, Types, $modal, $interval, FirstNames, OrderId, $http, customerDisplay, Receipt, $window) {

	$scope.menuUpdateMode = false;
	$scope.menuSelectedMode = false;
	$scope.tabGroups = TabGroups;
	$scope.menus = Menus;
	$scope.icons = Icons;
	$scope.types = Types;
	$scope.receipt = Receipt;
	$scope.customerDisplay = customerDisplay;


	$scope.boolean = {};

	setReceiptHeight();


	$(window).resize(function() {
		setReceiptHeight();
	});

	$scope.back = function() {
		window.history.back();
	}

	function setReceiptHeight() {
		$("#receipt").height($(window).height() - $("#header").height() - 60);
		$("#orderlist").height($("#receipt").height());
	}

	$scope.scrollStateIcon = Icons.scrollState.unlock;
	$scope.scrollToggle = function() {
		if ($scope.scrollStateIcon == Icons.scrollState.lock) {
			$scope.scrollStateIcon = Icons.scrollState.unlock;
			$(document).unbind();
		}
		else {
			$scope.scrollStateIcon = Icons.scrollState.lock;
			$(document).bind('touchmove', false);
		}
	};

	$scope.orders = Orders;
	$scope.order = {};
	initOrder();
	$scope.order_modify = false;

	$scope.save_order_state = function(order) {

		if (typeof order !== 'undefined') {
			var t = new Date();
			if (!order.history) order.history = [];
			var history = order.history[order.history.length] = {};
			history.state = order.state;
			history.created_at = t;
			$scope.orders.$save(order.$id);
		}
		else {
			$scope.orders.$save($scope.selected_order.$id);

		}
		$scope.selected_order = "";
	}

	function onlineOrderStateUpdate(order, state) {
		//console.log(order.onlineId);
		//var url = "http://teriyakionline.com/common/Orders_jsonp.php";
		var url = "http://teriyakionline.com/common/Orders.php?callback=JSON_CALLBACK";
		var responsePromise = $http.jsonp( url,
		             {  params : {
		                   action : "update_status_jsonp",
		                   id : order.onlineId,
		                   status : state
		                }
		              }
		            );

		responsePromise.success(function(data) {
			//console.log(data);
		    // do something with the returned JavaScript object
		    // ( in the "data" parameter ).
		});
	}

	$scope.select_order = function(order) {
		if (order.state == "Done") return;
		$scope.orderlist_on = false;
		/*
		angular.forEach($scope.orders, function(order) {
			order.selected = false;
		});
		order.selected = true;
		*/

		$scope.selected_order = order;
		$scope.boolean.paymentOnly = true;
		$scope.cancel();
		$('#select_orderlist').modal();
		//$('#group_menu_modal').modal();
		$scope.order_printing = $scope.selected_order;
		//console.log($scope.order_printing);
	}

	$scope.go_payment = function() {
		$scope.order = $scope.selected_order;
		$scope.order_details_on = false;
		payment();
		$scope.order_modify = true;
		$scope.boolean.paymentOnly = true;
	}

	$scope.go_modify = function() {
		$scope.order = $scope.selected_order;
		$scope.order_modify = true;
		if ($scope.order.paymentType != "Unpaid") {
			$scope.boolean.paymentOnly = true;
			order_details();
		}
		$scope.boolean.go_modify = true;
		//console.log($scope.order.paymentType);
	}

	$scope.go_refund = function() {
		$scope.selected_order.status = "Refunded";
		$scope.selected_order.state = "Done";
		$scope.orders.$save($scope.selected_order.$id);
	}

	$scope.go_remove = function() {
		$scope.selected_order.status = "Removed";
		$scope.selected_order.state = "Done";
		$scope.orders.$save($scope.selected_order.$id);
	}


	$scope.selectedItem = {};

	$scope.addItem = function(menu, menukey) {
		$scope.submenu = "";
		if ($scope.menuUpdateMode == true) {
			$scope.newMenu = menu;
			$scope.newMenu.mode = "Update";
			//$scope.newMenu.tabGroup = $scope.tabGroupKey;
			$scope.newMenu.key = menukey;
			$scope.oldTabGroupKey = $scope.tabGroupKey;
			$scope.menuSelectedMode = true;
			//console.log($scope.newMenu)
			return;
		}
		if (menu.type == "Option") {
			$scope.addOption(menu);
			return;
		}
		else if (menu.type == "Group") {
			//$scope.submenu = menukey;
			//$scope.groupMenuModal(menukey);
			show_group_menu(menukey);
		}
		else {
			var items = $scope.order.items;
			var index = -1;
			if ((index = duplicateCheck(items, menu)) >= 0) {
				items[index].qty++;
			}
	 		else {
	 			var job = getJob(menu);
	 			var rice = getRice(menu);
	 			//console.log(job);
				items.push({
					name: menu.name,
					abbr: menu.abbr,
					qty: 1,
					price: menu.price,
					basePrice: menu.price,
					optionPrice: 0,
					options: [],
					special_instruction: "",
					state: "Taken",
					selected: false,
					noDisplay: menu.noDisplay,
					job: job,
					rice: rice
				});
				index = items.length-1;
			}
			//console.log(index);
			$scope.itemSelected(items[index], index);
			//calculate();
		}
	};

	function getJob(menu) {
		if (menu.job) {
			return menu.job;
		}
		else {
			if (menu.parent) {
				if ($scope.menus[menu.parent].job) return $scope.menus[menu.parent].job;
				else return 'Unknown';
			}
			else return 'Unknown';
		}
	}

	function getRice(menu) {
		var rr = '';
		if (menu.rice) {
			rr = menu.rice;
		}
		else {
			if (menu.parent) {
				if ($scope.menus[menu.parent].rice) rr = $scope.menus[menu.parent].rice;
			}
		}
		if (rr == 'A') return 'A';
		else if (rr == 'B') return 'A';
		else if (rr == 'C') return 'B';
		else if (rr == 'D') return 'C';
		else if (rr == 'E') return 'D';
		else if (rr == 'F') return 'F';
		else return '';

	}

	function duplicateCheck(items, newItem) {
		var index = -1;
		var i = 0;
		angular.forEach(items, function(item) {
			//console.log(typeof item.options);
			if (item.name == newItem.name && (typeof item.options === 'undefined' || item.options.length == 0)) {
				index = i;
				return;
			}
			i++;
		});
		return index;
	}

	function calculate() {
		var items = $scope.order.items;
		var subtotal = 0, tax = 0, total = 0;

		angular.forEach(items, function(item) {
			//console.log("item.qty="+item.qty);
			item.price = parseFloat(item.basePrice) + parseFloat(item.optionPrice);
			subtotal += (parseFloat(item.price) * parseFloat(item.qty));
			//console.log("loop-subtotal="+subtotal);
		});
		//console.log("subtotal="+subtotal);
		$scope.order.subtotal = subtotal = parseFloat(subtotal).toFixed(2);
		$scope.order.tax = tax = (parseFloat(subtotal) * 9.6 / 100).toFixed(2);
		$scope.order.total = total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
	}

	$scope.itemSelected = function(item, index) {
		$scope.selectedItem = item;
		$scope.selectedItem.index = index;
		angular.forEach($scope.order.items, function(item) {
			item.selected = false;
		});
		item.selected = true;
	};

	function show_group_menu(menukey) {
		//console.log(menukey);
		$scope.groupkey = menukey;
		$('#group_menu_modal').modal();
	}


	$scope.openModal = function(item, index) {
		if (item.selected == true) $('#optionModal').modal();
		else $scope.itemSelected(item, index);
	}

	$scope.addOption = function(option) {
		//var text = (option.price == 0) ? option.name : option.name + "(" + option.price + ")";

		if (typeof $scope.selectedItem.options === 'undefined') $scope.selectedItem.options = [];
		$scope.selectedItem.options.push(option);
		//var price = parseFloat($scope.selectedItem.price);
		$scope.selectedItem.optionPrice += parseFloat(option.price);

		//$scope.order.items[$scope.selectedItem.id] = $scope.selectedItem;
		//calculate();
	};

	$scope.$watchCollection("selectedItem", function(){
		calculate();
	})

	$scope.$watch("order.total", function(val){
		$scope.hasItems = (val > 0) ? true : false;
	})
	$scope.$watch("order.htType", function(val){
		console.log(val);
	})
	/*
	$scope.$watch("order.orderType", function(val){
		if (val != "In-person") {
			$scope.order.htType = "Togo";
		}
	})
*/

	$scope.setOrderType = function(type) {
		//console.log($scope.order.orderType);
		angular.forEach($scope.orderTypes, function(type) {
			type.selected = false;
		});
		//$scope.order.orderType = type.name;
		type.selected = true;
		(type.name == $scope.orderTypes[0].name) ? $scope.setHtType($scope.htTypes[0]) : $scope.setHtType($scope.htTypes[1]);
	}

	$scope.setHtType = function(type) {
		angular.forEach($scope.htTypes, function(type) {
			type.selected = false;
		});
		$scope.order.htType = type.name;
		type.selected = true;
	}

	$scope.removeAllItems = function() {
		$scope.order.items = [];
		calculate();
	};

	$scope.removeItem = function() {
		//console.log($scope.selectedItem.index);
		$scope.order.items.splice($scope.selectedItem.index,1);
		calculate();
	};
	$scope.delete = function() {
		$scope.order.$remove();
		$location.path('/');
	}
	$scope.save = function() {
		$scope.order.$save();
		$location.path('/');
	}

	$scope.groupMenuModal = function(menukey) {
    	var modalInstance = $modal.open({
      		templateUrl: 'partials/groupMenuModal.html?v=1',
      		controller: 'groupMenuModalCtrl',
      		resolve: {
        		groupkey: function () {
         			return menukey;
        		}
      		}
    	});

    	modalInstance.result.then(function (menu) {
      		$scope.addItem(menu);
    	});

	}

	$scope.setTabKey = function(key) {
		$scope.tabGroupKey = key;
		$scope.menuSelectedMode = false;
		$scope.submenu = "";
	}

	$scope.addMenu = function() {
		$scope.newMenu = {};
		$scope.newMenu.type = $scope.types.menu[0];
		$scope.newMenu.tabGroup = $scope.tabGroupKey;
		$scope.newMenu.mode = "Add";
		$scope.menuSelectedMode = true;
	}

	$scope.deleteMenu = function() {
		$scope.menus.$remove($scope.newMenu.key);
		$scope.menuSelectedMode = false;
	}

	$scope.submitMenu = function() {
		if (typeof $scope.newMenu.abbr === 'undefined' || $scope.newMenu.abbr == '') {
			$scope.newMenu.abbr = $scope.newMenu.name;
		}
		if ($scope.newMenu.mode == "Update") {
			var key = $scope.newMenu.key;
			delete $scope.newMenu.mode;
			delete $scope.newMenu.key;
			$scope.menus.$save(key);
			if ($scope.oldTabGroupKey != $scope.tabGroupKey) {
				var sMenus = $scope.tabGroups[$scope.oldTabGroupKey].selectedMenus;
				var index = sMenus.indexOf(key);
				sMenus.splice(index,1);
				$scope.tabGroups.$save($scope.oldTabGroupKey);
				var sMenus = $scope.tabGroups[$scope.tabGroupKey].selectedMenus;
				sMenus.push(key);
				$scope.tabGroups.$save($scope.tabGroupKey);
			}
		}
		else {
			delete $scope.newMenu.mode;
			delete $scope.newMenu.key;
			var key = $scope.menus.$add($scope.newMenu).name();
			$scope.tabGroups[$scope.tabGroupKey].selectedMenus.push(key);
			$scope.tabGroups.$save($scope.tabGroupKey);
		}
		$scope.menuSelectedMode = false;
	}

	$scope.firstNames = FirstNames.name;

	$scope.clickTotal = function() {
		order_details();
		payment();
		$scope.order_printing = $scope.order;
		//setOrderId();
		//$scope.order.number = OrderNumber.$value;
	}

	function order_details() {
		$scope.order_details_on = true;
		$scope.payment_on = false;
	}
	function payment() {
		$scope.payment_on = true;
		$scope.order.paymentType = "Unpaid";

		$scope.isUnpaid = true;
		$scope.isCredit = false;

		//$scope.bills = makeBills($scope.order.total);
		$scope.bills = getCashExamples($scope.order.total);
	}

	function makeBills(total) {
		if (total <= 0) return;
		var bills = [5, 10, 20, 50, 100];
		var billButton = [];
		if (total <= 0) return billButton;
		billButton[0] = {};
		billButton[0].amount = Math.ceil(total);
		billButton[1] = {};
		billButton[1].amount = 5*(Math.ceil(Math.abs(billButton[0].amount/5)));
		if (billButton[0].amount == billButton[1].amount) var idx = 1;
		else var idx = 2;
		for (var i=1; i<bills.length; i++) {
			if (bills[i] > billButton[1].amount) {
				if (!billButton[idx]) billButton[idx] = {};
				billButton[idx].amount = bills[i];
				idx++;
				if (idx > 3) break;
			}
		}
		return billButton;
	};

	function uniqueArray(arr){
		var uniqueArr = [];
		$.each(arr, function(i, el){
			if($.inArray(el, uniqueArr) === -1) uniqueArr.push(el);
		});
		return uniqueArr;
	}

	function makeBillObject(arr){
		var res = [];
		for (var i=0; i<arr.length; i++){
			var obj = {};
			obj.amount = arr[i];
			res.push(obj);
		}
		return res;
	}

	function getCashExamples(amount) {
		amount = parseFloat(amount);
		var bills = [0.05, 0.1, 0.25, 1, 5, 10, 20, 50, 100];
		var result = [];
		result.push(amount);
		for (var i=0; i<bills.length; i++){
			if (bills[i] < 1) {
				var base = Math.ceil(amount * 100);
				var bill = bills[i] * 100;
				result.push((bill * Math.ceil(base/bill))/100);
			}
			else {
				var base = Math.ceil(amount);
				result.push(bills[i] * Math.ceil(base/bills[i]));
			}
		}
		//console.log(result);
		return makeBillObject(uniqueArray(result));
	}


	function initOrder() {
		var order = {
			id: "",
			items : [],
			total : 0,
			subtotal : 0,
			tax : 0,
			orderType : "In-person",
			htType : "Togo",
			paymentType : "Unpaid",
			cashReceived : 0,
			cashChange : 0,
			number: "",
			state: "Taken",
			customer_name: "",
			reserved_time: "",
			created_at : "",
	    	status: "",
	    	history: []
		};
		$scope.order = order;
		$scope.order_modify = false;
		$scope.boolean.go_modify = false;
		//setCustomerDisplay();
	};

	function setCustomerDisplay() {
		$scope.customerDisplay.$child("order").$set($scope.order);
		//console.log($scope.customerDisplay);
	}

	$scope.$watchCollection("order", function(){
		setCustomerDisplay();
	})

	$scope.clickUnpaid = function() {
		angular.forEach($scope.bills, function(bill) {
			bill.selected = false;
		});
		$scope.isCredit = false;
		$scope.isUnpaid = true;
		$scope.order.cashReceived = 0;
		$scope.order.paymentType = "Unpaid";
	}

	$scope.clickCredit = function() {
		angular.forEach($scope.bills, function(bill) {
			bill.selected = false;
		});
		$scope.isUnpaid = false;
		$scope.isCredit = true;
		$scope.order.cashReceived = 0;
		$scope.order.paymentType = "Credit";
		//console.log($scope.order.paymentType);
	}

	$scope.clickBill = function(bill) {
		angular.forEach($scope.bills, function(bill) {
			bill.selected = false;
		});
		bill.selected = true;
		$scope.isCredit = false;
		$scope.order.cashReceived = bill.amount;
	}

	$scope.$watch("order.cashReceived", function(data){
		var val = parseFloat(data) || 0;
		if (val == 0) {
			$scope.order.cashChange = 0;
			if ($scope.isCredit != true) {
				$scope.order.paymentType = "Unpaid";
				$scope.isUnpaid = true;
				$scope.isCredit = false;
			}
			else {
				$scope.order.paymentType = "Credit";
				$scope.isCredit = true;
				$scope.isUnpaid = false;
			}
		}
		else {
			//console.log(val);
			$scope.order.cashChange = (parseFloat(val) - parseFloat($scope.order.total)).toFixed(2);
			$scope.order.paymentType = "Cash";
			$scope.isUnpaid = false;
			$scope.isCredit = false;
		}
	});

	$scope.sendKitchen = function() {
		//putOrder();
		if ($scope.order_modify == true) {
			putOrder("done");
			$scope.cancel();
		}
		else putOrder();
	}

	$scope.resetNumber = function() {
		var num = 11;
		OrderId.$child("number").$set(num);
		$scope.order.number = num;
	}

	function setOrderId() {
		var d_date = OrderId.$child("date").$value;
		var n_date = new Date();
		n_date = $filter('date')(n_date, 'yyyyMMdd');
		if (d_date != n_date) {
			OrderId.$child("date").$set(n_date);
		}
		//$scope.order.number = OrderId.$child("number").$value;
		$scope.order.number = OrderId.$child("number").$value;
		console.log(OrderId.$child("number"));
		if ($scope.order.number >= 1000) OrderId.$child("number").$set(0);
		$scope.order.id = n_date + pad($scope.order.number, 3);
	}

	function setOrderPlacedTime() {
		if ($scope.order.reserved_time) {
			var rt = new Date($scope.order.reserved_time);
			$scope.order.orderPlacedTime = new Date(rt.setMinutes(rt.getMinutes()-15));
		}
		else {
			if ($scope.order.orderType != "In-person" && $scope.order.htType == "Here") {
				var ct = new Date($scope.order.created_at);
				if ($scope.order.state == "Taken") $scope.order.orderPlacedTime = new Date(ct.setMinutes(ct.getMinutes()+10));
				else if ($scope.order.state == "Arrived") $scope.order.orderPlacedTime = $scope.order.created_at;
				//console.log($scope.order.orderPlacedTime);
			}
			else $scope.order.orderPlacedTime = $scope.order.created_at;
		}
	}

	$scope.detail_save = function() {
		$scope.order.status = "Modified";
		$scope.orders.$save($scope.order.$id);
		$scope.cancel();
	}

	function putOrder() {
		//console.log($scope.order.$id);
		sanitizeOrder();
		if (typeof $scope.order.$id === "undefined" || $scope.order.$id  == "") {
			$scope.order.created_at = new Date();
			//setOrderId();
			//setOrderPlacedTime();
			var order = $scope.order;
			incId(order);
			/*
			OrderNumber.$set($scope.order.number+1).then(function(){
				$scope.orders.$add(order).then(function(ref){
					afterProcessing();
				});
			});
*/
		}
		else {
			if ($scope.order_modify == true) {
				if ($scope.order.paymentType != "Unpaid") {
					if ($scope.order.state == "Ready") {
						$scope.order.state = "Done";
						if ($scope.order.orderType == "Online") {
							onlineOrderStateUpdate($scope.order, "D");
						}
					}
					if ($scope.order.state == "Taken") $scope.order.state = "Arrived";
				}
			}
			if ($scope.boolean.go_modify == true) $scope.order.status = "Modified";
			//setOrderPlacedTime();
			$scope.orders.$save($scope.order.$id).then(function(){
				afterProcessing();
			});
		}
		//initOrder();
	}

	function incId(order) {

		$scope.counter = OrderId.$child('counter');
		$scope.counter.$transaction(function(currentCount) {
    		if (!currentCount) return 1;   // Initial value for counter.
    		if (currentCount < 0) return;  // Return undefined to abort transaction.
    		if (currentCount > 999) currentCount = 0;
    		return currentCount + 1;       // Increment the count by 1.
		}).then(function(snapshot) {
		    if (!snapshot) {
		        //console.log("error");
		    } else {
		    	//console.log(snapshot.val());
				var n_date = new Date();
				n_date = $filter('date')(n_date, 'yyyyMMdd');
				order.number = snapshot.val();
		    	order.id = n_date + pad(order.number, 3);
				$scope.orders.$add(order).then(function(ref){
					afterProcessing();
				});
		    }
		}, function(err) {
		    //console.log(err);
		});

	}

	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}


	function sanitizeOrder() {
		angular.forEach($scope.order.items, function(item) {
			delete item.selected;
		});
	}

	$scope.submitOrder = function() {
		$('#processing').modal({backdrop:false});
		putOrder();
	}

	function afterProcessing() {
		var printing = false;
		if ($scope.auto_print_on == true) {
			printing = true;
			//console.log($scope.order_modify + ":" + $scope.boolean.paymentOnly);
			if ($scope.order_modify == true || $scope.boolean.paymentOnly == true) printing = false;
		}
		initOrder();
		$scope.cancel();
		$('#processing').modal('hide');
		//if (printing == true) {
			if ($scope.order_printing.orderType == 'In-person')
				$scope.print();
			else $window.location.reload();
		//}
		// Reload whole page


	}

	$scope.cancel = function() {
		$scope.payment_on = false;
		$scope.order_details_on = false;
		if ($scope.boolean.paymentOnly == true) {
			//console.log($scope.order);
			initOrder();
			//console.log($scope.order);
			$scope.boolean.paymentOnly = false;
		}
	}

	$scope.print = function() {
		//console.log($scope.order_printing);
		$scope.now = new Date();
		if (typeof $scope.order_printing.id !== 'undefined' || $scope.order_printing.id != '') {
			//window.print();
			//console.log(Receipt);

			Receipt.$remove().then(function(){
				//Receipt.$value = $scope.order_printing;
				Receipt.$add($scope.order_printing).then(function(){
					$window.location.reload();
				});
				//console.log("Receipt Printing");
			});

			//$scope.receipt.$add($scope.order_printing);
			//console.log("save receipt");
		}
	}

}])
;
