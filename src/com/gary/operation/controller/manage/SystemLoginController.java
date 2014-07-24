package com.gary.operation.controller.manage;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gary.base.system.SystemConstant;
import com.gary.base.system.SystemResource;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.SystemMenu;
import com.gary.operation.domain.SystemUser;
import com.gary.operation.service.SystemLoginService;

@Controller
@RequestMapping("/SystemLoginController.do")
public class SystemLoginController {

	@Autowired
	private SystemLoginService service;
	
	/**
	 * 登录验证
	 * @param username 用户名
	 * @param password 密码
	 * @param style 皮肤
	 * @param request {HttpServletRequest}
	 * @return JsonResult
	 * @throws InterruptedException 
	 */
	@ResponseBody
	@RequestMapping(params="method=doLogin")
	public Object doLogin(String username, String password, HttpServletRequest request) {
		JsonResult result = new JsonResult();
		SystemUser user = service.loginValidate(username, password);
		if(user == null) {
			result.setSuccess(false);
			result.setMessage("用户名或密码不正确请核对后重新输入");
		} else if("lock".equals(user.getState())) {
			result.setSuccess(false);
			result.setMessage("您的账户已经被系统管理员锁定!");
		} else {
			List<String> actionIds = service.selectActionByUserId(user.getId());
			request.getSession().setAttribute(SystemConstant.LOGIN_USER, user);
			request.getSession().setAttribute(SystemConstant.USER_ACTION, actionIds);
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(params="method=doLogin2")
	public Object doLogin2(String userId, HttpServletRequest request) {
		JsonResult result = new JsonResult();
		SystemUser user = service.getSystemUserById(userId);
		if(user == null) {
			result.setSuccess(false);
			result.setMessage("用户名或密码不正确请核对后重新输入");
		} else if("lock".equals(user.getState())) {
			result.setSuccess(false);
			result.setMessage("您的账户已经被系统管理员锁定!");
		} else {
			List<String> actionIds = service.selectActionByUserId(user.getId());
			request.getSession().setAttribute(SystemConstant.LOGIN_USER, user);
			request.getSession().setAttribute(SystemConstant.USER_ACTION, actionIds);
		}
		return result;
	}
	
	/**
	 * 获得用户菜单
	 * @param request {HttpServletRequest}
	 * @return JsonResult
	 */
	@ResponseBody
	@RequestMapping(params="method=getUserMenus")
	public Object getUserMenus() {
		JsonResult result = new JsonResult();
		SystemUser user = SystemResource.getSystemUser();
		List<SystemMenu> menus = service.selectSystemMenuByUserId(user.getId());
		result.setData(menus);
		result.setMetaData(user);
		return result;
	}
	
	/**
	 * 退出系统
	 * @param request {HttpServletRequest}
	 * @return JsonResult
	 */
	@ResponseBody
	@RequestMapping(params="method=doQuit")
	public Object doQuit(HttpServletRequest request) {
		JsonResult result = new JsonResult();
		request.getSession().removeAttribute(SystemConstant.LOGIN_USER);
		return result;
	}
	
	/**
	 * 修改密码
	 * @return JsonResult
	 */
	@ResponseBody
	@RequestMapping(params="method=updatePassword")
	public Object updatePassword(String username, String password, String newPassword) {
		service.updatePassword(username, password, newPassword);
		return new JsonResult();
	}

}
