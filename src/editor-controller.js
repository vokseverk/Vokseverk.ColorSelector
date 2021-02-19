angular.module("umbraco").controller("ColorSelectorController", function($scope, angularHelper) {
	var presets = ['preset1', 'preset2', 'preset3', 'preset4', 'preset5']
	
	$scope.colors = []
	presets.map(function(p) {
		var preset = validHexColor($scope.model.config[p])
		if (preset != null) {
			var colorValue = {
				label: preset,
				value: preset
			}
			$scope.colors.push(colorValue)
			
			if (preset == $scope.model.value) {
				$scope.selectedPreset = colorValue
			}
		}
	})
	
	$scope.didSelectColor = function(color, $index, $event) {
		if (color != null) {
			// v7 sends a string, v8 an object
			var colorValue = typeof(color) == "string" ? color : color.value
			$scope.model.value = colorValue
			var currentForm = angularHelper.getCurrentForm($scope)
			currentForm.$setDirty()
		}
	}
	
	$scope.didTypeManualColor = function() {
		var color = $scope.model.value
		var newValue = validHexColor(color)
		if (newValue != null) {
			var newSetting = {
				label: newValue,
				value: newValue 
			}
			var v7 = typeof($scope.selectedPreset) == "string"
			$scope.selectedPreset = v7 ? newSetting.value : newSetting
		}
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
