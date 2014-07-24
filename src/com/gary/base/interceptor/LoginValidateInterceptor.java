package com.gary.base.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.gary.base.system.SystemConstant;
import com.gary.base.utli.JsonMapperUtil;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemUser;

public class LoginValidateInterceptor extends HandlerInterceptorAdapter  {

	private final static String PackageName = "com.gary.operation.controller.manage";
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		HandlerMethod method = (HandlerMethod) handler;
		String requestURL = request.getRequestURI();
		
		//是否登录后台
		String packageName = method.getBeanType().getPackage().getName();
		if(!PackageName.equals(packageName)) {
			return true;
		}
		
		//登录不验证 
		if(requestURL.contains("SystemLoginController.do") && "doLogin".equals(method.getMethod().getName())) {
			return true;
		}
		
		//其他操作进行登录拦截验证
		HttpSession session = request.getSession();
		SystemUser user = (SystemUser) session.getAttribute(SystemConstant.LOGIN_USER);
		if(user == null) {
			response.setContentType("application/json; charset=UTF-8");
			JsonResult result = new JsonResult();
			result.setTimeOut(true);
			JsonMapperUtil.getMapper().writeValue(response.getOutputStream(), result);
			return false;
		}
		return super.preHandle(request, response, handler);
	}

}
