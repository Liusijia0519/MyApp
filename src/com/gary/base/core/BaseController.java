package com.gary.base.core;

import javax.servlet.ServletContext;

import org.springframework.stereotype.Controller;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

@Controller
public abstract class BaseController {

	protected WebApplicationContext context;
	
	public void initBinder(ServletContext servletContext) {
		context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
	}
	
}
