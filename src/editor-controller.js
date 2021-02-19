angular.module("umbraco").controller("ColorSelectorController", function($scope, angularHelper) {
	var presets = ['preset1', 'preset2', 'preset3', 'preset4', 'preset5']
	
	$scope.colors = []
	presets.map(function(p) {
		var preset = validHexColor($scope.model.config[p])
		if (preset != null) {
			$scope.colors.push({
				label: preset,
				value: preset
			})
		}
	})
	
	$scope.didSelectColor = function() {
		var currentForm = angularHelper.getCurrentForm($scope)
		currentForm.$setDirty()
	}
	
	function validHexColor(value) {
		var hexRE = /^#?[a-fA-F0-9]{3,6}$/;
		if (value && value.match(hexRE)) {
			return value.replace('#', '')
		} else {
			return null
		}
	}
})
