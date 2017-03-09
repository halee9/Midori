'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('HomeCtrl', ['$scope', function($scope) {

}])

.controller('TicketPrintingCtrl', ['$scope', 'Ticket', '$window', function($scope, Ticket, $window) {
	$scope.order_printing = {};
	Ticket.$on("child_added", function(snapshot){
		var order = snapshot.snapshot.value;
		// console.log("Receipt Printing..", order);
		$scope.order_printing = order;
		setTimeout(function(){
			window.print();
		}, 0);
	});
}])

.controller('ReceiptPrintingCtrl', ['$scope', 'Receipt', '$window', function($scope, Receipt, $window) {
	$scope.order_printing = {};
	Receipt.$on("child_added", function(snapshot){
		var order = snapshot.snapshot.value;
		// console.log("Receipt Printing..", order);
		$scope.order_printing = order;
		setTimeout(function(){
			window.print();

			// if (typeof jsPrintSetup !== 'undefined') {
			// 	jsPrintSetup.setPrinter('Star TSP143LAN');
			// 	jsPrintSetup.setSilentPrint(true);
			// 	//jsPrintSetup.setOption('printSilent', 1);
			// }
			// //jsPrintSetup.print();
			// //$window.location.reload();
		}, 0);
	});
}])

.controller('PrintingCtrl', ['$scope', 'Orders', function($scope, Orders) {
	// var queue = [];
	$scope.orders = Orders;
	$scope.order_printing = {};
	// if (typeof jsPrintSetup !== 'undefined') {
	// 	jsPrintSetup.setPrinter('EPSON TM-T20');
	// 	jsPrintSetup.setSilentPrint(true);
	// }

	var now = new Date();
	$scope.orders.$on("child_added", function(snapshot){
		var order = snapshot.snapshot.value;
		var rec = new Date(order.created_at);
		//console.log(now-rec);
		if ((now-rec) < 0 && order.htType == 'Togo') {
			// var q = angular.copy(order);
			// queue.push(q);
			$scope.order_printing = order;
			setTimeout(function(){
				window.print();
				// jsPrintSetup.print();
			}, 0);
		}
	});
}])

.controller('PayrollsCtrl', ['$scope', 'Payrolls', 'Timesheets', '$filter', function($scope, Payrolls, Timesheets, $filter) {
	$scope.worktable = {};
	$scope.timesheets = Timesheets;
	$scope.payrolls = Payrolls;
	$scope.payroll = {};
	$scope.Math = window.Math;
	$scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

	$scope.getDetails = function(timesheet) {
		$scope.payroll = {};
		$scope.worktable = {};
		console.log(timesheet);
		var worktable = {};
		angular.copy(timesheet, $scope.worktable);
		console.log($scope.worktable.worktimes[0].checkin + " " + $scope.start_date);
		var worktimes = [];
		for (var i=0; i<$scope.worktable.worktimes.length; i++) {
			var checkin = $filter('date')(new Date($scope.worktable.worktimes[i].checkin), 'yyyy-MM-dd');
			if (checkin >= $scope.start_date &&
				checkin <= $scope.end_date) {
				console.log(checkin + " " + $scope.start_date);
				worktimes.push($scope.worktable.worktimes[i]);
			}
		}
		$scope.worktable.worktimes = worktimes;
		console.log($scope.worktable);
		$scope.worktable.paydate = $scope.today;
	}

	$scope.setPayroll = function(worktable) {
		$scope.payroll = {};
		var payroll = $scope.payrolls.$child(worktable.name);
		payroll.name = worktable.name;
		payroll.wage = worktable.wage;
		payroll.$save();
		var paydate = payroll.$child(worktable.paydate);
		paydate.date = worktable.paydate;
		var total = 0;
		paydate.payDetails = [];
		for (var i=0; i<worktable.worktimes.length; i++) {
			console.log(worktable.worktimes[i].pay);
			if (worktable.worktimes[i].pay > 0) {
				paydate.payDetails.push(worktable.worktimes[i]);
				total += worktable.worktimes[i].pay;
			}
		}
		paydate.total = total;
		console.log(payroll);
		paydate.$save();
		$scope.payroll = paydate;
	}

	$scope.setPay = function(worktable, daily) {
		daily.pay = worktable.wage * (daily.payHours + daily.payMinuates / 60);
		console.log(daily.payHours);
	}
}])

.controller('TimesheetCtrl', ['$scope', 'Timesheets', function($scope, Timesheets) {
	$scope.timesheets = Timesheets;
	$scope.employee = {};
	$scope.checkin = function(employee) {
		$scope.input_passcode = '';
		$scope.employee = employee;
		$scope.wrongcode = false;
		$('#passcode_entry').modal();
	}
	$scope.history = function(employee) {
		$scope.timelist = {};
		angular.copy(employee, $scope.timelist);

		var today = new Date();
		var start = today;
		start.setHours(0);
		(today.getDate() < 16) ? start.setDate(1) : start.setDate(16);
		var periods = [];
		//console.log(employee.worktimes.length);
		for (var i=employee.worktimes.length-1;i>=0;i--) {
			//console.log(employee.worktimes[i].checkout);
			var d = new Date(employee.worktimes[i].checkout);
			if (d < start) break;
			periods[periods.length] = employee.worktimes[i];
		}
		//console.log($scope.timelist);
		$scope.timelist.worktimes = periods;
		var worktimes = $scope.timelist.worktimes;
		var total = 0;
		var mins = 0;
		for (var i=0;i<worktimes.length;i++) {
			//console.log(worktimes[i].checkout);
			if (!worktimes[i].wage) continue;
			total += parseFloat(worktimes[i].wage);
			mins += parseInt(worktimes[i].workMinuates);
		}
		$scope.timelist.wages = total;
		$scope.timelist.workMinuates = mins;
		$('#history').modal();
	}
	$scope.check_passcode = function(input, employee) {
		$scope.employee = employee;
		if (input.length > 3) {
			if (input == $scope.employee.passcode) {
				$scope.wrongcode = false;
				if (!$scope.employee.worktimes) $scope.employee.worktimes = [];
				var worktimes = $scope.employee.worktimes;
				if ($scope.employee.state != "check-in") {
					var worktime = worktimes[worktimes.length] =  {};
					worktime.checkin = new Date();
					$scope.employee.state = "check-in";
					$scope.timesheets.$save($scope.employee.$id);
					$('#passcode_entry').modal("hide");
				}
				else {
					var worktime = worktimes[worktimes.length-1];
					worktime.checkout = new Date();
					var checkin = new Date(worktime.checkin);
					$scope.employee.state = "check-out";
					worktime.workMinuates = Math.floor((worktime.checkout - checkin) / 1000 / 60);
					//console.log(worktime.workMinuates);
					worktime.wage = (parseFloat($scope.employee.wage) * (worktime.workMinuates/60)).toFixed(2);
					$scope.timesheets.$save($scope.employee.$id);
				}
			}
			else {
				$scope.wrongcode = true;
			}
		}
	}

}])

.controller('NewTimesheetCtrl', ['$scope', 'Timesheets', '$location', function($scope, Timesheets, $location) {
	$scope.timesheets = Timesheets;
	$scope.employee = {};

	$scope.signup = function() {
		$scope.timesheets.$add($scope.employee);
		$location.path('/timesheet');
	}

}])



.controller('SettlementCtrl', ['$scope', 'Orders', '$http', '$filter', 'History', 'Settlement', 'Earning', function($scope, Orders, $http, $filter, History, Settlement, Earning) {
	$scope.orders = Orders;
	var earnings = Earning
	console.log(earnings);
	earnings.$on("child_added", function(snapshot){
		var earn = snapshot.snapshot.value;
		$scope.earn = earn;
	});
	//$scope.earn = {};

	$scope.settlement = {};

	$scope.$watchCollection("earn", function(){
		$scope.earn.bill_total = $scope.earn.over_50
			+ ($scope.earn.bill_20 * 20)
			+ ($scope.earn.bill_10 * 10)
			+ ($scope.earn.bill_5 * 5)
			+ ($scope.earn.bill_1);
		$scope.earn.cash = $scope.earn.bill_total - $scope.earn.subtract;
		$scope.earn.total = $scope.earn.cash + $scope.earn.credit;

	})



	$scope.settlement.date = $filter('date')(new Date(), 'yyyy-MM-dd');
	settle($scope.settlement.date);

	//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

	function settle(settlement_date) {
		$scope.settlement.sum = { total: 0, credit: 0, cash: 0, unpaid: 0, count: 0 };
		$scope.settlement.hourly = [];
		for (var i=0; i<24; i++) {
			$scope.settlement.hourly[i] = {};
			$scope.settlement.hourly[i].total = 0;
			$scope.settlement.hourly[i].credit = 0;
			$scope.settlement.hourly[i].cash = 0;
			$scope.settlement.hourly[i].unpaid = 0;
			$scope.settlement.hourly[i].accumulate = {};
			$scope.settlement.hourly[i].accumulate.total = 0;
			$scope.settlement.hourly[i].accumulate.credit = 0;
			$scope.settlement.hourly[i].accumulate.cash = 0;
		}

		$scope.orders.$on("child_added", function(snapshot){
			var order = snapshot.snapshot.value;
			//console.log(order);
			var order_date = $filter('date')(order.created_at, 'yyyy-MM-dd');
			if (order_date == settlement_date) {
				if (order.status == "Removed" || order.status == "Refunded") {}
				else {
					var amount = isNaN(parseFloat(order.total)) ? 0 : parseFloat(order.total);
					console.log(amount);
					var type = order.paymentType;
					var h = parseInt($filter('date')(order.created_at, 'H'));

					if (type == "Unpaid") {
						$scope.settlement.sum.unpaid += amount;
						$scope.settlement.hourly[h].unpaid += amount;
					}
					else {
						$scope.settlement.sum.count += 1;
						$scope.settlement.sum.total += amount;
						$scope.settlement.hourly[h].total += amount;
						if (type == "Credit") {
							$scope.settlement.sum.credit += amount;
							$scope.settlement.hourly[h].credit += amount;
						}
						else if (type == "Cash") {
							$scope.settlement.sum.cash += amount;
							$scope.settlement.hourly[h].cash += amount;
						}
					}
					accumulate($scope.settlement.hourly, h);
				}
			}

		});
	}

	function accumulate(array, index){
		array[index].accumulate.total = 0;
		array[index].accumulate.cash = 0;
		array[index].accumulate.credit = 0;
		for (var i=0; i<=index; i++) {
			array[index].accumulate.total += array[i].total;
			array[index].accumulate.cash += array[i].cash;
			array[index].accumulate.credit += array[i].credit;
		}
	}

	$scope.reSettle = function(date) {
		settle(date);
	}

	$scope.submitSettlement = function(date) {
		Settlement.$child(date).$set($scope.settlement).then(function(){
			alert("Your settlement data were updated!")
		});
	}

	$scope.submitEarning = function(date) {
		$scope.earn.created_at = new Date();
		Earning.$add($scope.earn).then(function(){
			alert("Your earning data were added!")
		});
	}

	$scope.send = function(date) {
		//console.log(date);
		//console.log(History.$child(date).$id);

		History.$child(date).$set($scope.orders).then(function(){
			alert("Today's data have been sent in the history foler.")
		});

		/*
		var orders = [];
		angular.forEach($scope.orders, function(order) {
			if (order.total) {
				//orders.push(order);
				var c_order = angular.copy(order);
				for (var i=0; i<c_order.items.length; i++) {
					if (c_order.items[i].options) {
						c_order.items[i].item_options = angular.copy(c_order.items[i].options);
						delete c_order.items[i].options;
					}
				}

				var data = "order=" + JSON.stringify(c_order).replace("&","and");
				var apiUrl = 'http://54.213.92.215:8081/api/order';
				$http.post(apiUrl, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
					.success(function(data) {
						//console.log("Data were sent");
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
		});
*/
		//var data = "date="+$scope.date +"&orders="+JSON.stringify(orders);

	}

	$scope.clear = function() {
		var r=confirm("You want to delete all the data below?");
		if (r==true) $scope.orders.$remove();
	}

}])

.controller('KitchenCtrl', ['$scope', 'Orders', 'Icons', 'Types', 'CustomerDisplay', '$interval', '$http', 'Ticket',
	function($scope, Orders, Icons, Types, CustomerDisplay, $interval, $http, Ticket) {
	$scope.orders = Orders;
	$scope.icons = Icons;
	$scope.types = Types;
	$scope.customerDisplay = CustomerDisplay;

	$scope.pre_total = "";
	$scope.total = "";
	$scope.cash_total = "";
	$scope.credit_total = "";

	var now = new Date();
	$scope.orders.$on("child_added", function(snapshot){
		var order = snapshot.snapshot.value;
		var rec = new Date(order.created_at);
		if ((now-rec) < 0 && order.htType == 'Togo') {
			$scope.print_ticket(order)
		}
		/*
		console.log(order);
		if (order.items) {
			for (var i=0; i<order.items.length; i++){
				var item = order.items[i];
				if (item.options){
					for (var j=0; j<item.options.length; j++){
						var opt = item.options[j];
						if (/spicy/i.test(opt.abbr)) {
							item.job = "Wok";
							console.log(item);
						}
					}
				}
				if (/spicy/i.test(item.special_instruction)) {
					item.job = "Wok";
					console.log(item);
				}
			}
		}
		*/

		if ($scope.speech_on == true) {
			var d = new Date();
			d.setTime(d.getTime() - 10000);
			var now = d.toJSON();
			//console.log(now);
			//console.log(order.created_at);
			if (now < order.created_at) {
				$("#doorbell").get(0).play();
				/*
				var names = [];
				for (var i=0; i < order.items.length; i++) {
					var qty = (order.items[i].qty > 1) ? order.items[i].qty + " " : "";
					names[i] = qty + order.items[i].name;
				}
				var speak_order = names.join();
				var speak_htType = (order.htType == "Here") ? " for here" : " to go";
				var speak_orderType = (order.orderType == "In-person") ? "" : order.orderType + " order.";

				var msg = new SpeechSynthesisUtterance(speak_order + speak_htType + speak_orderType);
				console.log(msg);
				window.speechSynthesis.speak(msg);
				window.speechSynthesis.speak(msg);
				*/
			}
		}
	});

	// $interval(function () {
	// 	var pre_total = 0;
	// 	var total = 0;
	// 	var cash_total = 0;
	// 	var credit_total = 0;
	// 	var keys = $scope.orders.$getIndex();
	// 	var now = new Date();
	// 	keys.forEach(function(key) {
	// 		var t = new Date($scope.orders[key].created_at);
	// 		if (typeof $scope.orders[key].state !== "Undefined" && $scope.orders[key].state !== "Done") {
	// 			var diff = Math.floor((now - t) / 1000 / 60);
	// 			$scope.orders[key].diff = diff;
	// 		}
	// 		if ($scope.orders[key].status == "Refunded" || $scope.orders[key].status == "Removed") {
	// 		}
	// 		else {
	// 			//console.log(now.toJSON().substr(0,10)+":"+t.toJSON().substr(0,10));
	// 			if (now.toLocaleDateString() == t.toLocaleDateString()) {
	// 				pre_total += parseFloat($scope.orders[key].total);
	// 				if ($scope.orders[key].paymentType != "Unpaid") {
	// 					total += parseFloat($scope.orders[key].total);
	// 					if ($scope.orders[key].paymentType == "Credit") credit_total += parseFloat($scope.orders[key].total);
	// 					else cash_total += parseFloat($scope.orders[key].total);
	// 				}
	// 			}
	// 		}
	// 	});
	// 	$scope.pre_total = pre_total;
	// 	$scope.total = total;
	// 	$scope.cash_total = cash_total;
	// 	$scope.credit_total = credit_total;
	//
	// }, 10000);
	//
	// $interval(function() {
	// 	$scope.clock = new Date();
	// }, 1000);

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

	$scope.print_ticket = function(order) {
		console.log("Printing ticket::::", order);
		Ticket.$remove().then(function(){
			//Receipt.$value = $scope.order_printing;
			Ticket.$add(order).then(function(){
				//$window.location.reload();
			});
		});
	}

	$scope.kitchen_done = function(order) {

		if (typeof order !== 'undefined') {
			var pre_state = order.state;
			if (order.paymentType == "Unpaid") {
				order.state = "Ready";
				if (order.orderType == "Online") {
					onlineOrderStateUpdate(order, "R");
				}
			}
			else {
				order.state = "Done";
				if (order.orderType == "Online") {
					onlineOrderStateUpdate(order, "D");
				}
			}

			var t = new Date();
			if (!order.history) order.history = [];
			var history = order.history[order.history.length] = {};
			history.pre_state = pre_state;
			history.state = order.state;
			history.created_at = t;
			$scope.orders.$save(order.$id);
		}
	}

	$scope.kitchen_back = function(order) {

		if (typeof order !== 'undefined') {
			var history = order.history.pop();
			order.state = history.pre_state;
			$scope.orders.$save(order.$id);
		}
	}

}])

.controller('CustomerCtrl', ['$scope', 'CustomerDisplay', function($scope, CustomerDisplay) {
	//$scope.customerDisplay = CustomerDisplay;
	$scope.order = CustomerDisplay.$child("order");

	$scope.order.$child("items").$on("child_added", function(snapshot){
		console.log("added!");
		//window.print();

	});


}])


.controller('CashierCtrl', ['$scope', '$routeParams', '$filter', '$location', 'TabGroups', 'Menus', 'Orders', 'Order', 'Icons', 'Util', 'Types', '$modal', '$interval', 'FirstNames', 'OrderId', '$http', 'CustomerDisplay',
	function($scope, $routeParams, $filter, $location, TabGroups, Menus, Orders, Order, Icons, Util, Types, $modal, $interval, FirstNames, OrderId, $http, customerDisplay) {

	$scope.menuUpdateMode = false;
	$scope.menuSelectedMode = false;
	$scope.tabGroups = TabGroups;
	$scope.menus = Menus;
	$scope.icons = Icons;
	$scope.types = Types;
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
		$scope.order.tax = tax = (parseFloat(subtotal) * 9.5 / 100).toFixed(2);
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
	});

	$scope.$watch("order.total", function(val){
		$scope.hasItems = (val > 0) ? true : false;
	});
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

		$scope.bills = makeBills($scope.order.total);
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
		if (printing == true) $scope.print();

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
				if ($scope.order_printing.orderType == 'In-person')
					window.print();
			}
	}

}])

.controller('groupMenuModalCtrl', ['$scope', '$modalInstance', 'groupkey', 'Menus',
	function($scope, $modalInstance, groupkey, Menus) {

	$scope.groupkey = groupkey;
	$scope.menus = Menus;

	$scope.select = function(menu) {
		$modalInstance.close(menu);
	};

	$scope.close = function () {
		//$modalInstance.close();
    	$modalInstance.dismiss('cancel');
  	};

}])



;
