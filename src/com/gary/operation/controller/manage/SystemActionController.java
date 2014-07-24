package com.gary.operation.controller.manage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemAction;
import com.gary.operation.domain.SystemMenu;
import com.gary.operation.service.SystemActionService;

@Controller
@RequestMapping("/SystemActionController.do")
public class SystemActionController {

	@Autowired
	private SystemActionService service;
	
	private Map<String, List<SystemAction>> springActionMapping = new HashMap<String, List<SystemAction>>();
	
	@ResponseBody
	@Action("查询系统菜单操作列表")
	@RequestMapping(params="method=selectActionList")
	public Object selectActionList(HttpServletRequest request, String node) {
		if(StringUtils.isNotEmpty(node) && "root".equals(node)) {
			return service.selectSystemMenuTree(node);
		}
		return getSystemActionsByMenuId(node, request);
	}
	
	@ResponseBody
	@Action("新增或修改")
	@RequestMapping(params="method=insertOrUpdate")
	public Object insertOrUpdate(@Json List<SystemAction> records) {
		service.insertOrUpdate(records);
		return new JsonResult();
	}
	
	/**
	 * 根据菜单的ID加载对应的操作集合
	 * @param node
	 * @param request
	 * @return
	 */
	private List<HashMap<String, Object>> getSystemActionsByMenuId(String node, HttpServletRequest request) {
		initSpringActionMapping(request);
		SystemMenu menu = service.selectMenuById(node);
		//反射获得Controller下所有action
		List<SystemAction> reflect = springActionMapping.get(menu.getSpringController());
		//查询数据库中当前Controller下所有action
		List<SystemAction> trusteeship = service.selectActionList(menu.getSpringController()); 
		List<HashMap<String, Object>> actions = new ArrayList<HashMap<String,Object>>();
		if(reflect != null) {
			for (SystemAction ac : reflect) {
				
				HashMap<String, Object> hashAc = new HashMap<String, Object>();
				hashAc.put("id", ac.getId());
				hashAc.put("text", ac.getDescription());
				hashAc.put("methodName", ac.getMethodName());
				hashAc.put("springController", ac.getSpringController());
				hashAc.put("leaf", true);
				hashAc.put("iconCls", "action-toothed-16");
				hashAc.put("checked", false);
				
				SystemAction action = getSystemAction(ac.getMethodName(), trusteeship);
				if(action != null) {
					hashAc.put("id", action.getId());
					hashAc.put("checked", true);
				}
				actions.add(hashAc);
			}
		}
		
		return actions;
	}
	
	private SystemAction getSystemAction(String methodName, List<SystemAction> trusteeship) {
		for (SystemAction systemAction : trusteeship) {
			if(systemAction.getMethodName().equals(methodName)) {
				return systemAction;
			}
		}
		return null;
	}
	
	/**
	 * 反射得到所有Controller下的Action
	 * @param request HttpServletRequest
	 */
	private void initSpringActionMapping(HttpServletRequest request) {
		if(springActionMapping.isEmpty()) {
			synchronized (springActionMapping) {
				if(springActionMapping.isEmpty()) {
					WebApplicationContext context = RequestContextUtils.getWebApplicationContext(request);
					RequestMappingHandlerMapping handlerMapping = context.getBean(RequestMappingHandlerMapping.class);
					Map<RequestMappingInfo, HandlerMethod> map = handlerMapping.getHandlerMethods(); 
					for (Iterator<RequestMappingInfo> iterator = map.keySet().iterator(); iterator    
			                .hasNext();) {    
						RequestMappingInfo info = iterator.next();  
			            HandlerMethod method = map.get(info);
			            Action description = method.getMethodAnnotation(Action.class);
			            List<SystemAction> actionlist = getSystemActionList(method.getBeanType().getSimpleName());
			            
						SystemAction action = new SystemAction();
						action.setId(UUID.randomUUID().toString());
						action.setMethodName(method.getMethod().getName());
						action.setSpringController(method.getBeanType().getSimpleName());
						
						action.setDescription(description != null ? description.value() : "");
						actionlist.add(action);
			        }  
				}
			}
		}
	}
	
	/**
	 * 根据controllerName初始化SystemAction集合
	 * @param controllerName spring控制器类名
	 */
	private List<SystemAction> getSystemActionList(String controllerName) {
		if(springActionMapping.get(controllerName) == null) {
			springActionMapping.put(controllerName, new ArrayList<SystemAction>());
		}
		return springActionMapping.get(controllerName);
	}
}
