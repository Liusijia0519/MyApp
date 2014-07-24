package com.gary.operation.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.base.core.PageBounds;
import com.gary.base.system.SystemException;
import com.gary.base.utli.PinYinUtil;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.operation.domain.SystemRole;
import com.gary.operation.domain.SystemUser;
import com.gary.operation.domain.SystemUserRole;
import com.gary.operation.mapper.SystemRoleMapper;
import com.gary.operation.mapper.SystemUserMapper;

@Service
public class SystemUserService {

	@Autowired
	private SystemUserMapper userMapper;
	
	@Autowired
	private SystemRoleMapper roleMapper;
	
	//查询用户集合
	public DataAndTotal selectSystemUser(Map<String, Object> searchParam, GridParameter param) {
		Object list = userMapper.selectSystemUser(searchParam, param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}
	
	//根据ID查询用户
	public SystemUser getSystemUserById(String id) {
		return userMapper.getSystemUserById(id);
	}
	
	//查询全部角色
	public List<SystemRole> selectSystemRole() {
		return roleMapper.selectSystemRole(null);
	}
	
	//新增或修改用户信息
	@Transactional
	public void insertOrUpdateSystemUser(SystemUser systemUser) throws ParseException{
		int result = 0;
		if(!StringUtils.isNotEmpty(systemUser.getId())) {
			if (isHasUsername(systemUser.getUsername().toString())) {
				throw new SystemException("用户名已存在");
			}
			systemUser.setId(UUID.randomUUID().toString());
			systemUser.setCreateDate(new Date());
			systemUser.setPassword("123456");
			systemUser.setState("normal");
			systemUser.setPinyinCode(PinYinUtil.cn2FirstSpell(systemUser.getRealName()));
			result = userMapper.insertSystemUser(systemUser);
		} else {
			systemUser.setPinyinCode(PinYinUtil.cn2FirstSpell(systemUser.getRealName()));
			result = userMapper.updateSystemUser(systemUser);
		}
		//删除角色
		userMapper.deleteUserRole(systemUser.getId());
		//重新绑定角色
		for (int i = 0; i < systemUser.getRoles().length; i++) {
			SystemUserRole userRole = new SystemUserRole();
			userRole.setId(UUID.randomUUID().toString());
			userRole.setUser_id(systemUser.getId());
			userRole.setRole_id(systemUser.getRoles()[i]);
			userMapper.insertUserRole(userRole);
		}
		
		if(result <= 0) {
			throw new SystemException("数据保存失败");
		}
	}
	
	//重置用户密码为123456
	public void updatePassword(String id) {
		SystemUser user = new SystemUser();
		user.setId(id);
		user.setPassword("123456");
		int result = userMapper.updatePassword(user);
		if(result <= 0) {
			throw new SystemException("重置密码失败");
		}
	}
	
	//修改用户状态
	public void updateState(String id, String state) {
		SystemUser user = new SystemUser();
		user.setId(id);
		user.setState(state);
		int result = userMapper.updateState(user);
		if(result <= 0 && "lock".equals(state)) {
			throw new SystemException("锁定用户账户失败");
		}
		if(result <= 0 && "lock".equals(state)) {
			throw new SystemException("解除账户锁定失败");
		}
	}
	
	//判断是否存在用户名
	public boolean isHasUsername(String username){
		int count =  userMapper.selectIsHasUser(username);
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}
	
}
