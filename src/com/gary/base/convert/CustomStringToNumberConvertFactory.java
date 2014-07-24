package com.gary.base.convert;

import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.util.NumberUtils;

public class CustomStringToNumberConvertFactory implements ConverterFactory<String, Number> {

	@Override
	public <T extends Number> Converter<String, T> getConverter(
			Class<T> targetType) {
		return new StringToNumber<T>(targetType);
	}
	
	
	private static final class StringToNumber<T extends Number> implements Converter<String, T> {

		private final Class<T> targetType;

		public StringToNumber(Class<T> targetType) {
			this.targetType = targetType;
		}

		public T convert(String source) {
			if (source.length() == 0) {
				source = "0";
			}
			return NumberUtils.parseNumber(source, this.targetType);
		}
	}

}
