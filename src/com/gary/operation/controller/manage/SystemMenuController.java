package com.gary.operation.controller.manage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemMenu;
import com.gary.operation.service.SystemMenuService;

@Controller
@RequestMapping("/SystemMenuController.do")
public class SystemMenuController {

	@Autowired
	private SystemMenuService service;
	
	@ResponseBody
	@Action("查询菜单列表")
	@RequestMapping(params="method=selectSystemMenuTree")
	public Object selectSystemMenuTree() {
		return service.selectSystemMenuTree();
	}
	
	@ResponseBody
	@Action("新增与编辑")
	@RequestMapping(params="method=insertOrUpdate")
	public Object insertOrUpdate(@Json List<SystemMenu> records) {
		service.insertOrUpdateMenu(records);
		return new JsonResult();
	}
}
