package com.gary.base.core;

import java.util.Date;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.converters.SqlDateConverter;

import com.gary.base.system.SystemResource;


public class ContextInitListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		SystemResource.setServletContext(null);
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		SystemResource.setServletContext(event.getServletContext());
		BeanUtilsBean.getInstance().getConvertUtils().register(new SqlDateConverter(null), Date.class);
	}

}
