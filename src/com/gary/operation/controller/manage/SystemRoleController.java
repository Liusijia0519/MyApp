package com.gary.operation.controller.manage;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemRole;
import com.gary.operation.service.SystemRoleService;

@Controller
@RequestMapping("/SystemRoleController.do")
public class SystemRoleController {

	@Autowired
	private SystemRoleService service;
	
	@ResponseBody
	@Action("查询全部系统角色")
	@RequestMapping(params="method=selectAllsystemRole")
	public Object selectAllsystemRole() {
		return new JsonResult(service.selectSystemRole());
	}
	
	@ResponseBody
	@Action("新增与编辑角色")
	@RequestMapping(params="method=insertOrUpdate")
	public Object insertOrUpdate(@Json List<SystemRole> records) {
		service.insertOrUpdate(records);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("查询所有菜单与操作树")
	@RequestMapping(params="method=selectMenuActionList")
	public Object selectMenuActionList(String roleId, String node) {
		if(!StringUtils.isNotEmpty(roleId)) {
			return Collections.EMPTY_LIST;
		}
		if(StringUtils.isNotEmpty(node) && "root".equals(node)) {
			return service.selectSystemMenuTree(node, roleId);
		} else {
			return service.selectSystemActionTree(node, roleId);
		}
	}
	
	@SuppressWarnings("rawtypes")
	@ResponseBody
	@Action("保存菜单与操作权限")
	@RequestMapping(params="method=saveMenuActions")
	public Object saveMenuActions(@Json List<HashMap> records, String roleId) {
		service.saveMenuAction(records, roleId);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("删除角色")
	@RequestMapping(params="method=deleteRole")
	public Object deleteRole(String roleId) {
		service.deleteRole(roleId);
		return new JsonResult();
	}
	
}
