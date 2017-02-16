'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])

.filter('myDate', function($filter) {
	var angularDateFilter = $filter('date');
	return function (dateString) {
		var d = new Date(dateString)
		return angularDateFilter(d.getTime(), 'hh:mm')
	}
})

.filter('hours', function() {
	return function(str) {
		if (typeof(str) === 'undefined') return '';
		var mins = parseInt(str);
		var hour = Math.floor(mins/60);
		var min = mins % 60;
		return hour + " h " + min + " m";
	}
})

.filter('riceSymbol', function() {
	return function(str) {
		if (typeof(str) === 'undefined') return '';
		//console.log(str);
		// if (str == 'A') return 'O';
		// else
    if (str == 'B') return ':';
		else if (str == 'C') return '.';
		else if (str == 'D') return ':';
		else return '';
	}
})

.filter('firstOne', function() {
	return function(str) {
		return (typeof(str) !== 'undefined') ? String(str).substr(0,1) : '';
	}
})

.filter('lastTwoDigits', function() {
	return function(str) {
		return (typeof(str) !== 'undefined') ? String(str).substr(-2) : '';
	}
})

.filter('firstWord', function() {
	return function(str) {
		var words = [];
		if (typeof(str) !== 'undefined') {
			words = String(str).split(' ');
		}
		return words[0];
	}
})

.filter('activeOrders', function() {
	return function(arr) {
		var new_arr = [];
		angular.forEach(arr, function(order){
			if (order.state == "Place" || order.state == "Taken" || order.state == "Arrived") {
				new_arr.push(order);
			}
		});
		return new_arr;
	}
})
.filter('inactiveOrders', function() {
	return function(arr) {
		var new_arr = [];
		angular.forEach(arr, function(order){
			if (order.state == "Cancel" || order.state == "Ready" || order.state == "Done") {
				new_arr.push(order);
			}
		});
		return new_arr;
	}
})

.filter('arrayToString', function() {
	return function(array) {
		return (typeof(array) !== 'undefined') ? array.join(', ') : '';
	}
})
.filter('optionsToString', function() {
	return function(item) {
		var options = item.options;
		var arr = [];
		angular.forEach(options, function(option) {
			var txt = (option.price > 0) ? option.abbr + " (" + option.price + ")" : option.abbr;
			arr.push(txt);
		});
		if (item.special_instruction) arr.push(item.special_instruction);
		return arr.join(', ') ;
	}
})
.filter('optionsToString2', function() {
	return function(item) {
		var options = item.options;
		var arr = [];
		angular.forEach(options, function(option) {
			arr.push(option.abbr);
		});
		if (item.special_instruction) arr.push(item.special_instruction);
		return (arr.length > 0) ? '[ ' + arr.join(', ') + ' ]' : '';
	}
})
/*
.filter('selectTime', function($filter) {
	return function(tt) {
		console.log(angular.isDate(new Date(tt)));
		return (angular.isDate(tt)) ? angularDateFilter(tt.getTime(), 'hh:mm') : 'Appointment';
	}
})
*/

;
