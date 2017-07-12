'use strict';

/* Directives */

angular.module('myApp.directives', [])

.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
    	elm.text(version);
    };
}])

.directive('tabs', function() {
	return {
	  	restrict: 'E',
	  	transclude: true,
	  	scope: {
	  	},
	  	controller: function($scope, $element) {
			var panes = $scope.panes = [];

			$scope.select = function(pane) {
		  		angular.forEach(panes, function(pane) {
					pane.selected = false;
		  		});
		  		pane.selected = true;
			}

			this.addPane = function(pane) {
		  		if (panes.length == 0) $scope.select(pane);
		 		panes.push(pane);
			}
		},
		template:
			'<div class="tabbable">' +
			  	'<ul class="nav nav-pills nav-stacked col-md-3" style="padding:0 5px;">' +
					'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
				  		'<a href="" ng-click="select(pane)" style="height: 80px;">{{pane.title}}</a>' +
					'</li>' +
			  	'</ul>' +
			  	'<div class="tab-content" ng-transclude></div>' +
			'</div>',
		replace: true
		};
})

.directive('pane', function() {
	return {
	  	require: '^tabs',
	  	restrict: 'E',
	  	transclude: true,
	  	scope: {
	  		title: '@'
	  	},
	  	link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
	  	},
	  	template:
			'<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
			'</div>',
	  	replace: true
	};
})

.directive('clock', function() {
	return {
	  	controller: function($scope, $element, $interval) {
			$interval(function() {
				$scope.clock = new Date();
			}, 1000);
	  	},
	  	template:
			'<span>{{clock | date: "shortTime"}}</span>',
	}
})

.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
 })

.directive('kitchenlist', function() {
	return {
		restrict: 'E',
	  	scope: {
	  		order: '=',
	  		types: '=',
	  		back: '&',
        done: '&',
        print: '&',
	  		itemDone: '&'
	  	},
	  	controller: function($scope, $element) {
	  		$scope.itemDone = function(item){
	  			item.done = (item.done) ? false : true;
	  			//console.log(item);
	  		}
	  	},
	  	link: function(scope, element, attrs) {
	  	},
		templateUrl: 'partials/kitchenlist.html?v=48'
	};
})

.directive('orderlist', function() {
	return {
		restrict: 'E',
	  	scope: {
	  		order: '=',
	  		types: '=',
	  		select: '&onSelect',
	  		save: '&'
	  	},
	  	controller: function($scope, $element) {
	  		$scope.backside = false;
	  		$scope.flip = function() {
	  			$scope.backside  = ($scope.backside == true) ? false : true;
	  		}
	  	},
	  	link: function(scope, element, attrs) {
			scope.$watch(attrs.fullname, function(value) {
				if (typeof value === 'undefined') scope.fullname = true;
				else scope.fullname = attrs.fullname;
			});
			/*
			scope.$watch(attrs.kitchen, function(value) {
				if (typeof value === 'undefined') scope.kitchen = false;
				else scope.kitchen = attrs.kitchen;
			});
			*/
	  	},
		templateUrl: 'partials/orderlist.html?v=11'
	};
})

.directive('ordersheet', function() {
	return {
		restrict: 'E',
	  	scope: {
	  		order: '=',
	  		types: '=',
	  		save: '&onSave',
	  		pay: '&onPay',
	  		cancel: '&onCancel'
	  	},
	  	controller: function($scope, $element) {
	  		$scope.clear = function() {
	  			//console.log("clear");
	  			$scope.order.reserved_time  = null;
	  		}
	  	},
		templateUrl: 'partials/ordersheet.html?v=5'
	};
})

.directive('currentTime', function($interval, dateFilter) {

	function link(scope, element, attrs) {
		var format,
			timeoutId;

		function updateTime() {
			element.text(dateFilter(new Date(), format));
		}

		scope.$watch(attrs.currentTime, function(value) {
			format = value;
			updateTime();
		});

		element.on('$destroy', function() {
			$interval.cancel(timeoutId);
		});

		// start the UI update process; save the timeoutId for canceling
		timeoutId = $interval(function() {
			updateTime(); // update DOM
		}, 1000);
	}

	return {
		link: link
	};
});


;
