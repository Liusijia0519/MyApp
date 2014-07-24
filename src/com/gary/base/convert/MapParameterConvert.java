package com.gary.base.convert;

import java.util.Iterator;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.gary.base.annotation.Json;
import com.gary.base.core.MapDataBinder;

public class MapParameterConvert implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return (parameter.getParameterType().isAssignableFrom(MapDataBinder.class)
				&& parameter.getParameterAnnotation(Json.class) == null);
	}

	@Override
	public Object resolveArgument(MethodParameter parameter,
			ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
			WebDataBinderFactory binderFactory) throws Exception {
		
		MapDataBinder binder = new MapDataBinder();
		
		Iterator<String> iterator = webRequest.getParameterNames();
		while(iterator.hasNext()) {
			String name = iterator.next();
			binder.put(name, webRequest.getParameter(name));
		}
		
		return binder;
	}

}
