package com.gary.operation.controller.manage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemDepartment;
import com.gary.operation.service.SystemDepartmentService;

@Controller
@RequestMapping("/SystemDepartmentController.do")
public class SystemDepartmentController {
	
	@Autowired
	private SystemDepartmentService service;

	@ResponseBody
	@Action("新增或修改部门")
	@RequestMapping(params="method=insertOrUpdateDept")
	public Object insertOrUpdateDept(@Json List<SystemDepartment> records) {
		service.insertOrUpdateDept(records);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("查询全部组织机构")
	@RequestMapping(params="method=getDepartmentTree")
	public Object getDepartmentTree() {
		Object data = service.getDepartmentTree();
		return data;
	}
	
	@ResponseBody
	@Action("查询有效组织机构")
	@RequestMapping(params="method=getAvailablDepartmentTree")
	public Object getAvailablDepartmentTree() {
		Object data = service.selectAvailablDepartment();
		return data;
	}
	
	@ResponseBody
	@RequestMapping(params="method=getCanSelectDeptTree")
	public Object getCanSelectDeptTree(String parentId) {
		Object data = service.getCanSelectDeptTree(parentId);
		return data;
	}
}
