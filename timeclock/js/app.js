angular.module('timeclockApp', [
	'ngRoute',
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

.factory('Staffs', ['$http', function($http) {
	var apiUrl = "http://api-highsqu.rhcloud.com/api/staffs";
	//var apiUrl = 'http://localhost:8081/api/staffs';
	var config = { headers: {'Content-Type': 'application/x-www-form-urlencoded'} };
    //var config = {headers: {'x-access-token': $cookies.get('token')}};
	return {
		checkPasscode: function(passcode){
			var data = { passcode: passcode };
			return $http.put(apiUrl+"/passcode", $.param(data), config);
		},
		clockPunch: function(id, type){
			var data = { type: type };
			return $http.put(apiUrl+"/"+id+"/clocks", $.param(data), config);
		}
	};
}])

.controller('TimeclockController', ["$scope", "Staffs", "$route", "$timeout", "$location",
	function($scope, Staffs, $route, $timeout, $location) {

	var timeout;
	$scope.keys = [];
	$scope.alerts = [];
	$scope.staff = {};
	$scope.showinfo = false;
	$scope.spinner = false;

	$scope.keyin = function(key) {
		$scope.keys.push(key);
		$scope.passcode = $scope.keys.join('');
		//console.log($scope.keys);
		if ($scope.keys.length == 4) checkPasscode($scope.passcode);
	};

	function checkPasscode(passcode) {
		$scope.spinner = true;
		Staffs.checkPasscode(passcode)
			.success(function(staff){
				//console.log(staff);
				$scope.spinner = false;
				$scope.staff._id = staff._id;
				$scope.staff.name = staff.name;
				//console.log(staff.clocks);
				if (staff.clocks.length>0) {
					var lastClock = staff.clocks.pop();
					$scope.staff.lastClock = {};
					$scope.staff.lastClock.type = lastClock.type;
					$scope.staff.lastClock.date = lastClock.date;
				}
				$scope.showinfo = true;
				$scope.now = new Date();
			})
			.error(function(err){
				//console.log(err);
				$scope.spinner = false;
				$scope.alerts.push({type: 'danger', msg: 'The passcode not found!'});
				//console.log($scope.alerts);
				timeout = $timeout(function(){
					$scope.alerts = [];
				}, 3000);
				$scope.clear();
			})
	}

	$scope.back = function() {
		$scope.keys.pop();
		$scope.passcode = $scope.keys.join('');
		//console.log($scope.passcode);
	};

	$scope.clear = function() {
		$scope.staff = {};
		$scope.keys = [];
		$scope.passcode = "";
		$scope.showinfo = false;
	};

	$scope.clock = function(type) {
		Staffs.clockPunch($scope.staff._id, type)
			.success(function(staff){
				$scope.alerts.push({type: 'danger', msg: 'You have clocked '+type+"!"});
				timeout = $timeout(function(){
					$scope.alerts = [];
				}, 3000);
				$scope.clear();
			})
			.error(function(err){
				console.log(err);
				$scope.clear();
			})
	};

	$scope.cancel = function() {
		$timeout.cancel(timeout);
		$scope.clear();
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
		$timeout.cancel(timeout);
		$scope.clear();
	};

}])

;
