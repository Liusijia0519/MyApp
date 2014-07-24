package com.gary.base.aop;

import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;

import com.gary.base.system.SystemException;
import com.gary.base.web.JsonResult;

public class ControllerExceptionHandler {
	
	private static final Log logger = LogFactory.getLog(ControllerExceptionHandler.class);

	public Object aroundProcess(ProceedingJoinPoint point) {
		Object result = null;
		try {
			result = point.proceed();
			logger.debug(point.getTarget().getClass() + "--" + point.getSignature().getName());
		} catch (Throwable e) {
			if(e instanceof SystemException) {
				SystemException ex = (SystemException) e;
				result = new JsonResult(false, ex.getMessage());
			} else {
				result = new JsonResult(false, "系统出现异常<br>详细错误信息已经记录到系统日志");
				e.printStackTrace();
				if(logger.isDebugEnabled()) {
				}
			}
		}
		return result;
	}
}
