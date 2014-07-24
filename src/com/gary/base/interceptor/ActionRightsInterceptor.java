package com.gary.base.interceptor;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.gary.base.system.SystemConstant;
import com.gary.base.utli.JsonMapperUtil;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemAction;
import com.gary.operation.service.SystemActionService;


public class ActionRightsInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	private SystemActionService service;
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		Map<RightsKey, SystemAction> rightsMap = service.getRightsMap();
		HandlerMethod method = (HandlerMethod) handler;
		
		String controller = method.getBeanType().getSimpleName();
		String methodName = method.getMethod().getName();
		
		RightsKey key = new RightsKey(controller, methodName);
		SystemAction action = rightsMap.get(key);
		if(action != null) {
			@SuppressWarnings("unchecked")
			List<String> actionIds = (List<String>) request.getSession().getAttribute(SystemConstant.USER_ACTION);
			for (int i = 0; i < actionIds.size(); i++) {
				if(actionIds.get(i).equals(action.getId())) {
					return true;
				}
			}
			response.setContentType("application/json; charset=UTF-8");
			JsonResult result = new JsonResult(false);
			result.setMessage("您没有该操作的权限");
			JsonMapperUtil.getMapper().writeValue(response.getOutputStream(), result);
			return false;
		}
		return true;
	}
}
