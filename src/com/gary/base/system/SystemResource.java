package com.gary.base.system;

import javax.servlet.ServletContext;

import com.gary.operation.domain.SystemUser;


public class SystemResource {

	private static ThreadLocal<SystemUser> systemResourceThreadLocal = new ThreadLocal<SystemUser>();
	
	private static ServletContext servletContext = null;
	
	public static ServletContext getServletContext() {
		return servletContext;
	}

	public static void setServletContext(ServletContext servletContext) {
		SystemResource.servletContext = servletContext;
	}
	
	public static String getRealPath(String path) {
		return SystemResource.servletContext.getRealPath(path);
	}

	public static SystemUser getSystemUser() {
		return systemResourceThreadLocal.get();
	}
	
	public static void setSystemUser(SystemUser user) {
		systemResourceThreadLocal.set(user);
	}

	public static void removeSystemUser() {
		systemResourceThreadLocal.remove();
	}
	
}
