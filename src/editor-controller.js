angular.module("umbraco").controller("ColorSelectorController", function($scope, $element) {
	$scope.colors = [
		{ value: '314159', label: '314159' },
		{ value: 'bada55', label: 'bada55' },
		{ value: 'ff9090', label: 'ff9090' }
	]
	
	$scope.didSelectColor = function(color) {
		$scope.model.value = color.value
	}
})
