package com.gary.base.convert;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

public class StringToDateConvert implements Converter<String, Date> {
	
	private SimpleDateFormat fullformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private SimpleDateFormat shortformat = new SimpleDateFormat("yyyy-MM-dd");

	public StringToDateConvert() {
	}
	
	@Override
	public Date convert(String source) {
		if(source.length() == 0) {
			return null;
		}
		try {
			return shortformat.parse(source);
		} catch (ParseException e) {
			try {
				return fullformat.parse(source);
			} catch (ParseException e1) {
				e1.printStackTrace();
			}
		}
		return null;
	}

}
