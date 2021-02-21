using System;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Vokseverk {
	
	public class ColorSelectorPropertyConverter : IPropertyValueConverter {

		public bool IsConverter(IPublishedPropertyType propertyType) {
			return propertyType.EditorAlias.Equals("Vokseverk.ColorSelector");
		}
		
		public Type GetPropertyValueType(IPublishedPropertyType propertyType) {
			return typeof(string);
		}
		
		public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType) {
			return PropertyCacheLevel.Element;
		}
		
		public bool? IsValue(object value, PropertyValueLevel level) {
			switch (level) {
				case PropertyValueLevel.Source:
					return value != null && (!(value is string) || string.IsNullOrWhiteSpace((string) value) == false);
				default:
					throw new NotSupportedException($"Invalid level: {level}.");
			}
		}
		
		public object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview) {
			if (source == null) {
				return null;
			}
			
			var attemptConvertString = source.TryConvertTo<string>();
			
			if (attemptConvertString.Success) {
				return attemptConvertString.Result;
			}
			
			return null;
		}
		
		public object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
			if (inter == null) {
				return null;
			}
			
			// Just to be extra safe
			if (inter is string value) {
				return value.Replace("#", "").ToLower();
			}
			
			return inter;
		}
		
		public object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
			return ConvertIntermediateToObject(owner, propertyType, referenceCacheLevel, inter, preview);
		}
	}
}
