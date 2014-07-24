package com.gary.base.convert;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.gary.base.annotation.Json;
import com.gary.base.core.MapDataBinder;
import com.gary.base.utli.JsonMapperUtil;

public class JsonParameterConvert implements HandlerMethodArgumentResolver {
	
	private ObjectMapper objectMapper = JsonMapperUtil.getMapper();
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Object resolveArgument(MethodParameter parameter,
			ModelAndViewContainer container, NativeWebRequest webRequest,
			WebDataBinderFactory factory) throws Exception {
		
		//获取客户端提交的JSON格式数据
		String parameterName = parameter.getParameterName();
		String jsonValue = webRequest.getParameter(parameterName);
		Class<?> paramType = parameter.getParameterType();
		if(!StringUtils.isNotEmpty(jsonValue)) {
			return paramType.newInstance();
		}
		
		//反序列化后的对象
		Object convertObject = null;
				
		//判断是否是集合
		if(Collection.class.isAssignableFrom(paramType)) {
			//泛型情况
			Type type = parameter.getGenericParameterType();
			if(type instanceof ParameterizedType) {
				try {
					ParameterizedType parameterizedType = (ParameterizedType) type;
					Class<?> actualType = (Class<?>) parameterizedType.getActualTypeArguments()[0];
					convertObject = objectMapper.readValue(jsonValue, 
							TypeFactory.defaultInstance().constructCollectionType((Class<? extends Collection>) paramType, actualType));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if(MapDataBinder.class.isAssignableFrom(paramType)) {
			MapDataBinder binder = new MapDataBinder();
			binder.putAll(objectMapper.readValue(jsonValue, HashMap.class));
			convertObject = binder;
		} else {
			convertObject = objectMapper.readValue(jsonValue, paramType);
		}
		
		return convertObject;
	}

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterAnnotation(Json.class) != null;
	}

}
