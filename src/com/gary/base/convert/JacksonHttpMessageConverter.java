package com.gary.base.convert;

import java.text.SimpleDateFormat;

import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.databind.DeserializationFeature;

public class JacksonHttpMessageConverter extends
		MappingJackson2HttpMessageConverter {

	private final static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	
	public JacksonHttpMessageConverter() {
		super();
		this.getObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		this.getObjectMapper().setDateFormat(format);
	}
}
