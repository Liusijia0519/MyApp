package com.gary.base.utli;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonMapperUtil {

	private static ObjectMapper mapper = new ObjectMapper();
	
	static {
		//忽略未知属性
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); 
	}
	
	public static ObjectMapper getMapper() {
		return mapper;
	}
	
}
