package com.gary.operation.controller.manage;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.core.MapDataBinder;
import com.gary.base.system.SystemException;
import com.gary.base.utli.PinYinUtil;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.Ratiochannel;
import com.gary.operation.domain.PartnerBase;
import com.gary.operation.domain.SystemUser;
import com.gary.operation.domain.PartnerDetail;
import com.gary.operation.service.PartnerService;
import com.gary.operation.service.SystemUserService;

@Controller
@RequestMapping("/PartnerController.do")
public class PartnerController {
	@Autowired
	private PartnerService service;
	@Autowired
	private SystemUserService userService;
	@ResponseBody
	@Action ("查询全部")
	@RequestMapping(params = "method=select")
	public Object select(GridParameter param, @Json MapDataBinder searchParam) {
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = service.select(searchParam.getInnerMap(), param);
		return new JsonResult(dataAndTotal);
	}
	
	@ResponseBody
	@Action ("查询渠道")
	@RequestMapping(params = "method=selectRatiochannel")
	public Object selectRatiochannel(GridParameter param, @Json MapDataBinder searchParam) {
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = service.selectRatiochannel(searchParam.getInnerMap(), param);
		return new JsonResult(dataAndTotal);
	}
	
	@ResponseBody
	@Action("新增合作伙伴")
	@RequestMapping(params="method=updatePartnerBase")
	public Object updatePartnerBase(@Json MapDataBinder params) throws ParseException{
		String username = params.getInnerMap().get("username").toString();
		if (userService.isHasUsername(username)) {
			throw new SystemException("用户名已存在");
		}
		//用户ID 两个表里都要插
		String userid = UUID.randomUUID().toString();
		//实例化一个user
		SystemUser user = new SystemUser();
		user.setId(userid);
		user.setUsername(params.getInnerMap().get("username").toString());
		user.setRealName(params.getInnerMap().get("name").toString());
		user.setDepartmentID(params.getInnerMap().get("departmentID").toString());
		String[] roles = params.getInnerMap().get("roles").toString().split(",");
		user.setRoles(roles);
		user.setCreateDate(new Date());
		user.setPassword("123456");
		user.setState("normal");
		user.setPinyinCode(PinYinUtil.cn2FirstSpell(params.getInnerMap().get("name").toString()));
		//调用系统用户新增方法,实现自动新增系统用户
		service.insertSystemUser(user);
		//合作伙伴基本信息
		PartnerBase pb = new PartnerBase();
		String ischannel = params.getInnerMap().get("ischannel").toString();
		pb.setUserid(userid);
		pb.setChannelid(params.getInnerMap().get("channelid").toString());
		pb.setIschannel(ischannel.equals("1") ? true:false);
		pb.setName(params.getInnerMap().get("name").toString());
		pb.setPayratio(new BigDecimal(params.getInnerMap().get("payratio").toString()));
		pb.setPcode(params.getInnerMap().get("pcode").toString());
		//插入合作伙伴
		service.insertOrUpdate(pb);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("编辑合作伙伴基本信息")
	@RequestMapping(params="method=updatePartnerbase")
	public Object updatePartnerbase(PartnerBase record) {
		service.insertOrUpdate(record);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("新增或编辑,合作伙伴详细信息")
	@RequestMapping(params="method=updateDetail")
	public Object updateDetail(PartnerDetail record) {
		service.updateDetail(record);
		return new JsonResult();
	}
	
	@ResponseBody
	@Action("根据用户ID查询单个")
	@RequestMapping(params="method=getPartnerDetailById")
	public Object getPartnerDetailById(String id) {
		Object data = service.getPartnerDetailById(id);
		JsonResult result = new JsonResult(data);
		return result;
	}
	
	@ResponseBody
	@Action("根据用户ID查询基本信息")
	@RequestMapping(params="method=getPartnerBaseById")
	public Object getPartnerBaseById(String id) {
		Object data = service.getPartnerBaseById(id);
		JsonResult result = new JsonResult(data);
		return result;
	}
	
	@ResponseBody
	@Action("根据ID删除合作伙伴(三张表)")
	@RequestMapping(params="method=deletePartnerByPrimaryKey")
	public Object deletePartnerByPrimaryKey(String id,String channelid) {
		service.deletePartnerByPrimaryKey(id,channelid);
		return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("删除渠道信息")
	@RequestMapping(params="method=deleteChannelByPrimaryKey")
	public Object deleteChannelByPrimaryKey(String id) {
		service.deleteChannelByPrimaryKey(id);
		return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("更新渠道信息")
	@RequestMapping(params="method=insertOrUpdateChannel")
	public Object insertOrUpdateChannel(@Json List<Ratiochannel> paramList) {
		service.insertOrUpdateChannel(paramList);
		return JsonResult.SUCCESS;
	}
}
