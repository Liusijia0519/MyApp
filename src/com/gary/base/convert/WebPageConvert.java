package com.gary.base.convert;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.gary.base.web.WebPage;
import com.gary.base.web.WebPageImpl;

public class WebPageConvert implements HandlerMethodArgumentResolver {

	private int page = 1;
	private int limit = 10;

	public void setPage(int page) {
		this.page = page;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter,
			ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
			WebDataBinderFactory binderFactory) throws Exception {
		int _page = page;
		int _limit = limit;
		String s_page = webRequest.getParameter("page");
		String s_limit = webRequest.getParameter("limit");
		if (StringUtils.isNotEmpty(s_page)) {
			_page = Integer.valueOf(s_page);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			_limit = Integer.valueOf(s_limit);
			;
		}
		WebPageImpl pageImpl = new WebPageImpl(_page, _limit);
		return pageImpl;
	}

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().isAssignableFrom(WebPage.class);
	}

}
