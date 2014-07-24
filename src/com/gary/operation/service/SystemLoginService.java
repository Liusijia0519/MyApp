package com.gary.operation.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.base.system.SystemException;
import com.gary.operation.domain.SystemMenu;
import com.gary.operation.domain.SystemUser;
import com.gary.operation.mapper.SystemMenuMapper;
import com.gary.operation.mapper.SystemUserMapper;

@Service
public class SystemLoginService {

	@Autowired
	private SystemUserMapper userMapper;
	
	@Autowired
	private SystemMenuMapper menuMapper;
	
	/**
	 * 系统登录验证
	 * @param username
	 * @param password
	 * @return
	 */
	@Transactional
	public SystemUser loginValidate(String username, String password) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("username", username);
		param.put("password", password);
		return userMapper.getSystemUserByNameAndPwd(param);
	}
	
	//查询actionId集合
	public List<String> selectActionByUserId(String userId) {
		return userMapper.selectActionByUserId(userId);
	}
	
	public SystemUser getSystemUserById(String id) {
		return userMapper.getSystemUserById(id);
	}
	
	/**
	 * 根据用户id查询菜单
	 * @param user_id 用户id
	 * @return 菜单数据 已树装结构返回
	 */
	public List<SystemMenu> selectSystemMenuByUserId(String user_id) {
		return menuMapper.selectSystemMenuByUserId(user_id);
	}
	
	/**
	 * 修改密码
	 * @param systemUser
	 */
	public void updatePassword(String username, String password, String newPassword) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("username", username);
		param.put("password", password);
		SystemUser systemUser = userMapper.getSystemUserByNameAndPwd(param);
		if(systemUser == null) {
			throw new SystemException("密码修改失败,用户名与原始密码不正确");
		}
		systemUser.setPassword(newPassword);
		int result = userMapper.updatePassword(systemUser);
		if(result <= 0) {
			throw new SystemException("密码修改失败");
		}
	}
	
}
