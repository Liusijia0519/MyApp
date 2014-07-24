package com.gary.base.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.gary.base.system.SystemConstant;
import com.gary.base.system.SystemResource;
import com.gary.operation.domain.SystemUser;

public class BindThreadLocalDataFilter extends SystemFilter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		try {
			//系统用户
			SystemUser user = (SystemUser) httpRequest.getSession().getAttribute(SystemConstant.LOGIN_USER);
			SystemResource.setSystemUser(user);
			
			//doChain..
			chain.doFilter(httpRequest, httpResponse);
		} catch (Exception e) {
			throw new ServletException(e);
		}finally {
			//清除数据
			SystemResource.removeSystemUser();
		}
	}

}
