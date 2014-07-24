package com.gary.operation.controller.manage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.core.MapDataBinder;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemUser;
import com.gary.operation.service.SystemUserService;

@Controller
@RequestMapping("/SystemUserController.do")
public class SystemUserController {

	@Autowired
	private SystemUserService service;
	
	@ResponseBody
	@Action("查询全部系统用户")
	@RequestMapping(params="method=selectSystemUser")
	public Object selectSystemUser(GridParameter param, @Json MapDataBinder searchParam) {
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = service.selectSystemUser(searchParam.getInnerMap(), param);
		return new JsonResult(dataAndTotal);
	}
	
	@ResponseBody
	@Action("新增或编辑用户")
	@RequestMapping(params="method=insertOrUpdateUser")
	public Object insertOrUpdateUser(SystemUser user) {
		service.insertOrUpdateSystemUser(user);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("根据用户ID查询单个用户")
	@RequestMapping(params="method=getUserById")
	public Object getUserById(String id) {
		Object data = service.getSystemUserById(id);
		JsonResult result = new JsonResult(data);
		return result;
	}
	
	@ResponseBody
	@Action("查询全部角色")
	@RequestMapping(params="method=selectSystemRole")
	public Object selectSystemRole() {
		Object data = service.selectSystemRole();
		JsonResult result = new JsonResult(data);
		return result;
	}
	
	@ResponseBody
	@Action("修改密码")
	@RequestMapping(params="method=updatePassword")
	public Object updatePassword(String id) {
		service.updatePassword(id);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("设置用户状态(锁定,解锁)")
	@RequestMapping(params="method=updateState")
	public Object updateState(String id, String state) {
		service.updateState(id, state);
		return new JsonResult();
	}
}
