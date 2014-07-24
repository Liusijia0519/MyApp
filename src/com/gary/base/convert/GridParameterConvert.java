package com.gary.base.convert;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.fasterxml.jackson.databind.type.TypeFactory;
import com.gary.base.utli.JsonMapperUtil;
import com.gary.base.web.GridParameter;
import com.gary.base.web.Sort;

public class GridParameterConvert implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().isAssignableFrom(GridParameter.class);
	}

	@Override
	public Object resolveArgument(MethodParameter parameter,
			ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
			WebDataBinderFactory binderFactory) throws Exception {

		String page = webRequest.getParameter("page");
		String start = webRequest.getParameter("start");
		String limit = webRequest.getParameter("limit");
		String sort = webRequest.getParameter("sort");
		
		GridParameter param = new GridParameter();
		if(StringUtils.isNotEmpty(page)) {
			param.setPage(Integer.valueOf(page));
		}
		if(StringUtils.isNotEmpty(start)) {
			param.setStart(Integer.valueOf(start));
		}
		if(StringUtils.isNotEmpty(limit)) {
			param.setLimit(Integer.valueOf(limit));
		}
		if(StringUtils.isNotEmpty(sort)) {
			try {
				List<Sort> sorts = JsonMapperUtil.getMapper().readValue(sort, TypeFactory.defaultInstance().constructCollectionType(ArrayList.class, Sort.class));
				param.setSorts(sorts);
			} catch (Exception e) {
				throw e;
			}
		}
		return param;
	}

}
