package com.gary.operation.controller.manage;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemDictionary;
import com.gary.operation.domain.SystemDictionaryType;
import com.gary.operation.service.SystemDictionaryService;

@Controller
@RequestMapping("/SystemDictionaryController.do")
public class SystemDictionaryController {

	@Autowired
	private SystemDictionaryService service;
	
	@ResponseBody
	@Action("查询全部字典类别")
	@RequestMapping(params="method=selectDictionaryType")
	public Object selectDictionaryType() {
		List<SystemDictionaryType> list = service.selectDictionaryType();
		return list;
	}
	
	@ResponseBody
	@Action("根据编码与类型查询全部字典")
	@RequestMapping(params="method=selectDictionary")
	public Object selectDictionary(String code, String type) {
		if(!StringUtils.isNotEmpty(type)) {
			return JsonResult.SUCCESS;
		}
		if(SystemDictionaryType.TREE.equals(type)) {
			return service.selectDictionaryTreeByCode(code);
		}
		if(SystemDictionaryType.COMBO.equals(type)) {
			return service.selectDictionaryComboByCode(code);
		}
		return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("根据编码与类型查询有效字典")
	@RequestMapping(params="method=selectAvailablDictionary")
	public Object selectAvailablDictionary(String code, String type) {
		if(!StringUtils.isNotEmpty(type)) {
			return JsonResult.SUCCESS;
		}
		if(SystemDictionaryType.TREE.equals(type)) {
			return service.selectAvailablTreeByCode(code);
		}
		if(SystemDictionaryType.COMBO.equals(type)) {
			return service.selectAvailablComboByCode(code);
		}
		return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("根据字典编码清除字典数据缓存")
	@RequestMapping(params="method=evictSystemDictionaryCache")
	public Object evictSystemDictionaryCache(String code) {
		service.evictSystemDictionaryCache(code);
		return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("批量新增与编辑")
	@RequestMapping(params="method=insertOrUpdateDictionary")
	public Object insertOrUpdateDictionary(@Json List<SystemDictionary> records) {
		service.insertOrUpdateDictionary(records);
		return JsonResult.SUCCESS;
	}
}
