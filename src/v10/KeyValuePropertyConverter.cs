using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Extensions;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace Vokseverk {

	public class KeyValuePropertyConverter : IPropertyValueConverter {

		public bool IsConverter(IPublishedPropertyType propertyType) {
			return propertyType.EditorAlias.Equals("Vokseverk.KeyValueEditor");
		}

		public Type GetPropertyValueType(IPublishedPropertyType propertyType) {
			return typeof(List<KeyAndValue>);
		}

		public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType) {
			return PropertyCacheLevel.Element;
		}

		public bool? IsValue(object value, PropertyValueLevel level) {
			switch (level) {
				case PropertyValueLevel.Source:
					return value != null && value is List<KeyAndValue>;
				default:
					throw new NotSupportedException($"Invalid level: {level}.");
			}
		}

		public object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview) {
			var interList = new List<KeyAndValue>();
			if (source == null) {
				return interList;
			}

			var interString = source.ToString();
			if (interString.DetectIsJson()) {
				try {
					var json = JsonConvert.DeserializeObject<JArray>(interString);

					foreach (var jt in json) {
						var kvp = new KeyAndValue(jt["key"].ToString(), jt["value"].ToString());
						interList.Add(kvp);
					}
					return interList;
				}
				catch { /* Hmm, not JSON after all ... */ }
			}

			return interList;
		}

		public object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
			if (inter == null) {
				return null;
			}

			if (inter is List<KeyAndValue>) {
				return inter;
			}

			return null;
		}

		public object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
			if (inter == null) {
				return null;
			}

			// TODO: Should this be returned as:
			// <values>
			//   <item>
			//     <key>Name</key>
			//     <value>Value</value>
			//   </item>
			//   ...
			// </values>
			return inter.ToString();
		}

		public class KeyAndValue {
			public KeyAndValue(string key, string value) {
				Key = key;
				Value = value;
			}

			public string Key { get; }
			public string Value { get; }

			public override string ToString() {
				return JsonConvert.SerializeObject(this);
			}
		}
	}
}
