package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;

import com.gary.operation.domain.SystemRole;
import com.gary.operation.domain.SystemRoleAction;
import com.gary.operation.domain.SystemRoleMenu;

public interface SystemRoleMapper {

	public List<SystemRole> selectSystemRole(HashMap<String, Object> param);
	
	public int insertOrUpdate(SystemRole role);
	
	public List<String> selectMenuIdListByRoleId(String roleId);
	
	public List<String> selectActionIdListByRoleId(String roleId);
	
	public int insertRoleAction(SystemRoleAction action);
	
	public int deleteRoleAction(SystemRoleAction action);
	
	public int insertRoleMenu(SystemRoleMenu menu);
	
	public int deleteRoleMenu(SystemRoleMenu menu);
	
	public int deleteRoleById(String id);
	
	public int deleteRoleMenuByRoleId(String roleId);
	
	public int deleteRoleActionByRoleId(String roleId);
	
	public int deleteRoleUserByRoleId(String roleId);
}
