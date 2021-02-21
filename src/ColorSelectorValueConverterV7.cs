using System;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Vokseverk {
	
	[PropertyValueType(typeof(string))]
	[PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
	public class ColorSelectorPropertyConverter : PropertyValueConverterBase {

		public override bool IsConverter(PublishedPropertyType propertyType) {
			return propertyType.PropertyEditorAlias.Equals("Vokseverk.ColorSelector");
		}
		
		public override object ConvertDataToSource(PublishedPropertyType propertyType, object data, bool preview) {
			var attemptConvertString = data.TryConvertTo<string>();
			
			if (attemptConvertString.Success) {
				return attemptConvertString.Result;
			}
			
			return null;
		}
		
		public override object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview) {
			if (source == null) {
				return null;
			}
			
			var cleaned = source.ToString().Replace("#", "").ToLower();
			
			return cleaned;
		}
	}
}
